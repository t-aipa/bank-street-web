'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  category: string
  date: Date
  merchant?: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    amount: 42.99,
    description: 'Coffee Shop',
    category: 'Dining',
    date: new Date('2025-01-01'),
    merchant: 'Starbucks'
  },
  {
    id: '2',
    type: 'credit',
    amount: 2500.00,
    description: 'Salary Deposit',
    category: 'Income',
    date: new Date('2025-01-01')
  },
  // Add more mock transactions as needed
]

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all')

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true
    return transaction.type === filter
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Transaction History
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'credit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('credit')}
          >
            Income
          </Button>
          <Button
            variant={filter === 'debit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('debit')}
          >
            Expenses
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.category} • {format(transaction.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === 'credit'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'credit' ? '+' : '-'}$
                    {transaction.amount.toFixed(2)}
                  </p>
                  {transaction.merchant && (
                    <p className="text-sm text-muted-foreground">
                      {transaction.merchant}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
