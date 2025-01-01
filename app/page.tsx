'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Store, Map } from "lucide-react"

export default function Home() {
  const features = [
    {
      title: "Bank Station",
      description: "Start your financial journey with personalized recommendations and AI-powered insights.",
      icon: <Building2 className="w-6 h-6" />,
      href: "/bank-station"
    },
    {
      title: "Bank Store",
      description: "Browse and compare financial products from multiple banks in one place.",
      icon: <Store className="w-6 h-6" />,
      href: "/bank-store"
    },
    {
      title: "Bank Atlas",
      description: "Discover banks and services near you with our interactive map.",
      icon: <Map className="w-6 h-6" />,
      href: "/bank-atlas"
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6">
          Your Financial Journey Starts Here
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Bank Street helps you discover, compare, and engage with banking products and services.
          Make informed decisions with AI-powered insights and real-time recommendations.
        </p>
        <div className="flex justify-center gap-4 mb-16">
          <Button asChild size="lg">
            <Link href="/bank-station">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/bank-store">
              Explore Products
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-muted-foreground">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
