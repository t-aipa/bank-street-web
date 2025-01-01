import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BankingDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Bank Street Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
            <CardDescription>Current available balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$10,000.00</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Details</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Last 3 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Coffee Shop</span>
                <span className="text-red-500">-$4.50</span>
              </div>
              <div className="flex justify-between">
                <span>Salary Deposit</span>
                <span className="text-green-500">+$3,000.00</span>
              </div>
              <div className="flex justify-between">
                <span>Grocery Store</span>
                <span className="text-red-500">-$65.30</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View All</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common banking operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full">Transfer Money</Button>
              <Button className="w-full" variant="outline">Pay Bills</Button>
              <Button className="w-full" variant="outline">Mobile Deposit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
