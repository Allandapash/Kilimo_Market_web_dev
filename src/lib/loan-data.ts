
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
    logo: 'https://picsum.photos/seed/equity-logo/200/200',
    aiHint: 'bank logo'
  },
  {
    id: 'provider-2',
    name: 'Stima SACCO FarmerPlus',
    interest_rate: 12.0,
    max_amount: 250000,
    contact: 'agri@stimasacco.com',
    logo: 'https://picsum.photos/seed/stima-logo/200/200',
    aiHint: 'financial logo'
  },
  {
    id: 'provider-3',
    name: 'Wakulima Cooperative Fund',
    interest_rate: 10.0,
    max_amount: 100000,
    contact: 'info@wakulimacoop.org',
    logo: 'https://picsum.photos/seed/wakulima-logo/200/200',
    aiHint: 'cooperative logo'
  }
];
