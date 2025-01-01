import { render, screen, fireEvent } from '@testing-library/react'
import { TransactionHistory } from '@/components/bank-station/transaction-history'

describe('TransactionHistory', () => {
  it('renders transaction history component', () => {
    render(<TransactionHistory />)
    
    expect(screen.getByText('Transaction History')).toBeInTheDocument()
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Income')).toBeInTheDocument()
    expect(screen.getByText('Expenses')).toBeInTheDocument()
  })

  it('filters transactions correctly', () => {
    render(<TransactionHistory />)
    
    // Check initial state (all transactions)
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument()
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument()

    // Filter by income
    fireEvent.click(screen.getByText('Income'))
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument()
    expect(screen.queryByText('Coffee Shop')).not.toBeInTheDocument()

    // Filter by expenses
    fireEvent.click(screen.getByText('Expenses'))
    expect(screen.queryByText('Salary Deposit')).not.toBeInTheDocument()
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument()
  })
})
