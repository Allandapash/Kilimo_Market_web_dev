
"use server";

import { revalidatePath } from 'next/cache';
import { addProduceListing } from '@/lib/data';
import type { Produce } from '@/lib/types';

export async function handleAddProduce(listingData: Omit<Produce, 'id' | 'location' | 'aiHint'>) {
    try {
        await addProduceListing(listingData);
        // Invalidate the cache for the dashboard page
        revalidatePath('/dashboard');
        revalidatePath('/marketplace');
    } catch (error) {
        console.error("Error adding produce listing:", error);
        // Optionally re-throw the error if you want the client to handle it
        throw new Error("Failed to create new listing.");
    }
}
