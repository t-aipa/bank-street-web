'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/bank-store/product-card"
import { Search, Filter } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { creditCards, mortgages, businessAccounts, savingsAccounts } from '@/lib/data/products'

export default function BankStore() {
  const [searchQuery, setSearchQuery] = useState('')

  const filterProducts = (products: any[]) => {
    if (!searchQuery) return products
    const query = searchQuery.toLowerCase()
    return products.filter(
      product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.bankName.toLowerCase().includes(query)
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Bank Store</h1>
        
        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
            <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Product Categories */}
        <Tabs defaultValue="credit-cards" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="credit-cards">Credit Cards</TabsTrigger>
            <TabsTrigger value="mortgages">Mortgages</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>

          <TabsContent value="credit-cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProducts(creditCards).map((card) => (
                <ProductCard
                  key={card.id}
                  title={card.title}
                  bankName={card.bankName}
                  description={card.description}
                  rating={card.rating}
                  features={card.features}
                  ctaText="Apply Now"
                  onSelect={() => console.log(`Selected ${card.title}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mortgages">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProducts(mortgages).map((mortgage) => (
                <ProductCard
                  key={mortgage.id}
                  title={mortgage.title}
                  bankName={mortgage.bankName}
                  description={mortgage.description}
                  rating={mortgage.rating}
                  features={mortgage.features}
                  ctaText="Check Rates"
                  onSelect={() => console.log(`Selected ${mortgage.title}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="business">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProducts(businessAccounts).map((account) => (
                <ProductCard
                  key={account.id}
                  title={account.title}
                  bankName={account.bankName}
                  description={account.description}
                  rating={account.rating}
                  features={account.features}
                  ctaText="Open Account"
                  onSelect={() => console.log(`Selected ${account.title}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="savings">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProducts(savingsAccounts).map((account) => (
                <ProductCard
                  key={account.id}
                  title={account.title}
                  bankName={account.bankName}
                  description={account.description}
                  rating={account.rating}
                  features={account.features}
                  ctaText="Start Saving"
                  onSelect={() => console.log(`Selected ${account.title}`)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
