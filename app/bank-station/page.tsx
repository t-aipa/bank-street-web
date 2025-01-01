'use client'

import { TransactionHistory } from '@/components/bank-station/transaction-history'
import { SpendingInsights } from '@/components/bank-station/spending-insights'
import { BankStellaChat } from '@/components/bank-stella/chat'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NotificationsDropdown } from '@/components/notifications/notifications-dropdown'
import { ArrowUpRight, Wallet, CreditCard, PiggyBank, Menu } from 'lucide-react'
import { useState } from 'react'

export default function BankStation() {
  const [currentLine, setCurrentLine] = useState('tozai') // Default to Tozai line theme

  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      {/* Navigation Bar - Metro Line Style */}
      <nav className="bg-[#009BBF] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Menu className="w-6 h-6 md:hidden" />
              <span className="text-2xl font-bold">Bank Street</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/bank-station" className="hover:bg-[#007A99] px-4 py-2 rounded-sm">Station</a>
              <a href="/bank-store" className="hover:bg-[#007A99] px-4 py-2 rounded-sm">Store</a>
              <a href="/bank-atlas" className="hover:bg-[#007A99] px-4 py-2 rounded-sm">Atlas</a>
              <NotificationsDropdown />
            </div>
          </div>
        </div>
      </nav>

      {/* Metro Line Indicator */}
      <div className="h-2 bg-[#009BBF]" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Bank Station</h1>
              <p className="text-muted-foreground mt-1">東京メトロ銀行駅</p>
            </div>
            <Button 
              className="flex items-center gap-2 bg-[#00BB85] hover:bg-[#009970]"
              size="lg"
            >
              <ArrowUpRight className="w-4 h-4" />
              Quick Transfer
            </Button>
          </div>

          {/* Account Overview - Metro Card Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-l-4 border-l-[#009BBF] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Checking Account
                </CardTitle>
                <Wallet className="w-4 h-4 text-[#009BBF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450.65</div>
                <p className="text-xs text-muted-foreground">
                  Available Balance
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-l-4 border-l-[#F62E36] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Credit Card
                </CardTitle>
                <CreditCard className="w-4 h-4 text-[#F62E36]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,850.00</div>
                <p className="text-xs text-muted-foreground">
                  Current Balance
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-l-4 border-l-[#00BB85] shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Savings Account
                </CardTitle>
                <PiggyBank className="w-4 h-4 text-[#00BB85]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,250.80</div>
                <p className="text-xs text-muted-foreground">
                  Total Savings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid - Metro Station Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <TransactionHistory />
              <SpendingInsights />
            </div>
            <div className="lg:pl-8 space-y-8">
              <BankStellaChat />
            </div>
          </div>
        </div>
      </main>

      {/* Metro Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Bank Street</h3>
              <p className="text-sm text-gray-400">東京メトロ銀行</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Personal Banking</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Business Banking</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Investments</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Accessibility</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
