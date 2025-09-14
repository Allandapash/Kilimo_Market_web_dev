
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
    logo: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='200' height='200'><rect width='200' height='200' fill='%23F8F9FA'/><g transform='translate(50 50)'><path d='M84.2,66.3V33.7c0-1.8-1.5-3.3-3.3-3.3H20c-1.8,0-3.3,1.5-3.3,3.3v63.9c0,1.8,1.5,3.3,3.3,3.3h60.9c1.8,0,3.3-1.5,3.3-3.3V66.3z M50,66.3H20V33.7h30V66.3z' fill='%23D97706'/></g></svg>`,
    aiHint: 'equity bank logo'
  },
  {
    id: 'provider-2',
    name: 'Stima SACCO FarmerPlus',
    interest_rate: 12.0,
    max_amount: 250000,
    contact: 'agri@stimasacco.com',
    logo: 'https://picsum.photos/seed/stima-sacco-logo/200/200',
    aiHint: 'stima sacco logo'
  },
  {
    id: 'provider-3',
    name: 'Wakulima Cooperative Fund',
    interest_rate: 10.0,
    max_amount: 100000,
    contact: 'info@wakulimacoop.org',
    logo: 'https://picsum.photos/seed/wakulima-fund-logo/200/200',
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
