export const creditCards = [
  {
    id: 'cc-1',
    title: 'Premium Rewards Card',
    bankName: 'Global Bank',
    description: 'Earn unlimited rewards on every purchase with our premium credit card.',
    rating: 4.8,
    features: [
      '5% cashback on travel',
      '3% on dining',
      '1% on everything else',
      'No annual fee'
    ],
    annualFee: 0,
    apr: '14.99% - 24.99%',
    rewardsRate: '1% - 5%',
    creditScoreRequired: '700+'
  },
  {
    id: 'cc-2',
    title: 'Travel Elite Card',
    bankName: 'Voyager Bank',
    description: 'Your perfect companion for worldwide travel with premium benefits.',
    rating: 4.7,
    features: [
      'No foreign transaction fees',
      'Airport lounge access',
      'Travel insurance',
      'Global assistance'
    ],
    annualFee: 95,
    apr: '16.99% - 26.99%',
    rewardsRate: '2x - 5x points',
    creditScoreRequired: '720+'
  }
]

export const mortgages = [
  {
    id: 'mg-1',
    title: 'First-Time Buyer Mortgage',
    bankName: 'Home Finance Bank',
    description: 'Perfect for first-time homebuyers with competitive rates.',
    rating: 4.6,
    features: [
      'Low down payment options',
      'Flexible credit requirements',
      'Free rate lock',
      'Online application'
    ],
    interestRate: '3.5% - 4.5%',
    downPayment: '3.5%',
    terms: ['15 years', '30 years'],
    type: 'Fixed Rate'
  },
  {
    id: 'mg-2',
    title: 'Jumbo Mortgage',
    bankName: 'Elite Lending',
    description: 'Specialized mortgage for high-value properties.',
    rating: 4.8,
    features: [
      'High loan amounts',
      'Competitive rates',
      'Personalized service',
      'Multiple term options'
    ],
    interestRate: '4.0% - 5.0%',
    downPayment: '10%',
    terms: ['15 years', '30 years'],
    type: 'Fixed Rate'
  }
]

export const businessAccounts = [
  {
    id: 'ba-1',
    title: 'Business Growth Account',
    bankName: 'Enterprise Bank',
    description: 'Ideal for growing businesses with scalable features.',
    rating: 4.9,
    features: [
      'No monthly fees',
      'Unlimited transactions',
      'Business debit card',
      'Online banking'
    ],
    monthlyFee: 0,
    minBalance: 1500,
    transactionLimit: 'Unlimited',
    additionalServices: ['Payroll', 'Merchant Services']
  },
  {
    id: 'ba-2',
    title: 'Startup Business Account',
    bankName: 'Innovation Bank',
    description: 'Designed for new businesses and startups.',
    rating: 4.7,
    features: [
      'Low minimum balance',
      'Free business tools',
      'Mobile banking',
      'Integration with accounting software'
    ],
    monthlyFee: 0,
    minBalance: 500,
    transactionLimit: '500/month',
    additionalServices: ['Business Advisory', 'Tax Planning']
  }
]

export const savingsAccounts = [
  {
    id: 'sa-1',
    title: 'High-Yield Savings',
    bankName: 'Wealth Bank',
    description: 'Earn more with our competitive high-yield savings account.',
    rating: 4.8,
    features: [
      'High APY',
      'No monthly fees',
      'Mobile banking',
      'Automatic savings'
    ],
    apy: '4.5%',
    minBalance: 0,
    monthlyFee: 0,
    withdrawalLimit: '6/month'
  },
  {
    id: 'sa-2',
    title: 'Student Savings',
    bankName: 'Future Bank',
    description: 'Special savings account for students with bonus features.',
    rating: 4.6,
    features: [
      'No minimum balance',
      'Free ATM access',
      'Mobile banking',
      'Financial education resources'
    ],
    apy: '3.5%',
    minBalance: 0,
    monthlyFee: 0,
    withdrawalLimit: '6/month'
  }
]
