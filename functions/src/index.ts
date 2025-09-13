
import { setGlobalOptions } from "firebase-functions";
import * as logger from "firebase-functions/logger";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// Set global options for the functions.
setGlobalOptions({ maxInstances: 10 });

/**
 * Cloud Function to update a farmer's loan limit when a new transaction is added.
 * Triggered whenever a document is written in the "Transactions" collection.
 */
export const onTransactionCreate = onDocumentWritten("Transactions/{transactionId}", async (event) => {
    // We only act on document creation
    if (!event.data?.after.exists || event.data.before.exists) {
        logger.info("Not a new transaction, exiting function.");
        return null;
    }

    const transactionData = event.data.after.data();
    const farmerId = transactionData.farmer_id;
    const transactionAmount = transactionData.amount;

    if (!farmerId || typeof transactionAmount !== 'number') {
        logger.error("Missing farmerId or invalid amount in transaction.", { data: transactionData });
        return null;
    }

    const farmerRef = db.collection('Users').doc(farmerId);

    try {
        await db.runTransaction(async (t) => {
            const farmerDoc = await t.get(farmerRef);

            if (!farmerDoc.exists) {
                logger.error("Farmer document does not exist:", { farmerId });
                return;
            }

            const farmerData = farmerDoc.data()!;
            
            // Calculate new cumulative sales
            const currentTotalSales = farmerData.total_sales || 0;
            const newTotalSales = currentTotalSales + transactionAmount;
            
            // Calculate new loan limit
            const defaultLimit = 5000;
            const newLoanLimit = defaultLimit + (newTotalSales * 0.10);

            logger.info(`Updating loan limit for farmer ${farmerId}.`, {
                oldSales: currentTotalSales,
                newSales: newTotalSales,
                oldLimit: farmerData.loan_limit,
                newLimit: newLoanLimit
            });
            
            // Update farmer's document
            t.update(farmerRef, {
                total_sales: newTotalSales,
                loan_limit: newLoanLimit
            });
        });

        logger.info("Successfully updated loan limit.", { farmerId });
        return null;

    } catch (error) {
        logger.error("Transaction failed: ", { error: error, farmerId: farmerId });
        return null;
    }
});
