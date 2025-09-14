
export interface LoanProvider {
  id: string;
  name: string;
  interest_rate: number;
  max_amount: number;
  contact: string;
  logo: string;
  aiHint: string;
}

// Mock data for loan providers
export const loanProviders: LoanProvider[] = [
  {
    id: 'provider-1',
    name: 'Equity Bank AgriLoan',
    interest_rate: 14.5,
    max_amount: 500000,
    contact: 'loans@equitybank.co.ke',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Equity_Group_Logo.png',
    aiHint: 'equity bank logo'
  },
  {
    id: 'provider-2',
    name: 'Stima SACCO FarmerPlus',
    interest_rate: 12.0,
    max_amount: 250000,
    contact: 'agri@stimasacco.com',
    logo: 'https://stimasacco.com/assets/images/stima-logo.png',
    aiHint: 'stima sacco logo'
  },
  {
    id: 'provider-3',
    name: 'Wakulima Cooperative Fund',
    interest_rate: 10.0,
    max_amount: 100000,
    contact: 'info@wakulimacoop.org',
    logo: 'https://wakulimacooperative.co.ke/assets/logo.png',
    aiHint: 'cooperative fund logo'
  },
  {
    id: 'provider-4',
    name: 'World Bank',
    interest_rate: 9.5,
    max_amount: 1000000,
    contact: 'agri-finance@worldbank.org',
    logo: 'https://picsum.photos/seed/world-bank-logo/200/200',
    aiHint: 'world bank logo'
  },
  {
    id: 'provider-5',
    name: 'Britam',
    interest_rate: 13.0,
    max_amount: 300000,
    contact: 'agribusiness@britam.com',
    logo: 'https://picsum.photos/seed/britam-insurance-logo/200/200',
    aiHint: 'britam insurance logo'
  }
];
