export const PRODUCT_LINES = {
  credit: {
    id: 'credit',
    name: 'Credit Card Street',
    color: '#F62E36', // Marunouchi line red
    icon: 'credit-card',
    description: 'Explore premium credit cards with exclusive rewards',
    products: ['Premium Travel Card', 'Cashback Plus', 'Business Elite']
  },
  mortgage: {
    id: 'mortgage',
    name: 'Mortgage Avenue',
    color: '#009BBF', // Tozai line blue
    icon: 'home',
    description: 'Find your perfect home loan solution',
    products: ['First Home Loan', 'Investment Property', 'Refinancing']
  },
  savings: {
    id: 'savings',
    name: 'Savings Circle',
    color: '#00BB85', // Chiyoda line green
    icon: 'piggy-bank',
    description: 'Grow your wealth with high-yield accounts',
    products: ['High-Yield Savings', 'Term Deposits', 'Investment Accounts']
  },
  business: {
    id: 'business',
    name: 'Business District',
    color: '#FF9500', // Ginza line gold
    icon: 'briefcase',
    description: 'Complete business banking solutions',
    products: ['Business Checking', 'Merchant Services', 'Business Loans']
  },
  investment: {
    id: 'investment',
    name: 'Investment Junction',
    color: '#8F76D6', // Hanzomon line purple
    icon: 'trending-up',
    description: 'Smart investment options for your future',
    products: ['Stocks & ETFs', 'Managed Portfolios', 'Retirement Planning']
  }
} as const

export type ProductLineId = keyof typeof PRODUCT_LINES
