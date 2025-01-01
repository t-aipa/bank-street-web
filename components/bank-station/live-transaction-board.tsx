'use client'

import { useEffect, useState } from 'react'
import { socketService } from '@/lib/socket'
import { MetroLoader } from '@/components/ui/metro-loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  timestamp: Date
  status: 'pending' | 'completed' | 'failed'
}

export function LiveTransactionBoard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Subscribe to real-time transaction updates
    const handleTransaction = (transaction: Transaction) => {
      setTransactions(prev => [transaction, ...prev].slice(0, 10))
    }

    socketService.subscribe('transaction', handleTransaction)
    setIsLoading(false)

    return () => {
      socketService.unsubscribe('transaction', handleTransaction)
    }
  }, [])

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'pending':
        return 'bg-yellow-500'
      case 'failed':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Live Transactions</CardTitle>
        <MetroLoader className="w-24" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <AnimatePresence>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <MetroLoader />
              </div>
            ) : (
              transactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mb-4"
                >
                  <div className="bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            getStatusColor(transaction.status)
                          }`}
                        />
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(transaction.timestamp), 'HH:mm:ss')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={transaction.type === 'credit' ? 'default' : 'destructive'}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}$
                          {transaction.amount.toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
