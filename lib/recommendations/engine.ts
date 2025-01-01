import { PRODUCT_LINES } from '../constants/product-lines'
import type { ProductLineId } from '../constants/product-lines'

// Using TensorFlow.js for simple collaborative filtering
import * as tf from '@tensorflow/tfjs'

interface UserProfile {
  id: string
  age: number
  income: number
  creditScore: number
  existingProducts: ProductLineId[]
  transactionHistory: {
    category: string
    amount: number
    frequency: number
  }[]
}

interface ProductRecommendation {
  productLine: ProductLineId
  score: number
  reason: string
}

export class RecommendationEngine {
  private model: tf.Sequential | null = null

  constructor() {
    this.initModel()
  }

  private async initModel() {
    // Simple neural network for product recommendations
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 32, activation: 'relu', inputShape: [10] }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: Object.keys(PRODUCT_LINES).length, activation: 'softmax' })
      ]
    })

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    })
  }

  private preprocessUserProfile(profile: UserProfile): tf.Tensor {
    // Convert user profile to features
    const features = [
      profile.age / 100, // Normalize age
      profile.income / 1000000, // Normalize income
      profile.creditScore / 850, // Normalize credit score
      profile.existingProducts.length / Object.keys(PRODUCT_LINES).length,
      ...this.getTransactionFeatures(profile.transactionHistory)
    ]

    return tf.tensor2d([features])
  }

  private getTransactionFeatures(transactions: UserProfile['transactionHistory']): number[] {
    // Extract relevant features from transaction history
    const totalSpending = transactions.reduce((sum, t) => sum + t.amount, 0)
    const avgTransactionSize = totalSpending / transactions.length
    const categories = new Set(transactions.map(t => t.category)).size

    return [
      totalSpending / 10000, // Normalize total spending
      avgTransactionSize / 1000, // Normalize avg transaction
      categories / 10, // Normalize category diversity
      Math.min(transactions.length / 100, 1), // Normalize transaction frequency
      transactions.filter(t => t.amount > 1000).length / transactions.length, // Large transaction ratio
      transactions.filter(t => t.category === 'investment').length / transactions.length // Investment activity
    ]
  }

  async getRecommendations(profile: UserProfile): Promise<ProductRecommendation[]> {
    if (!this.model) {
      throw new Error('Model not initialized')
    }

    const features = this.preprocessUserProfile(profile)
    const predictions = this.model.predict(features) as tf.Tensor

    const scores = await predictions.array() as number[][]
    
    // Convert scores to recommendations
    const recommendations: ProductRecommendation[] = Object.entries(PRODUCT_LINES)
      .map(([id, line], index) => ({
        productLine: id as ProductLineId,
        score: scores[0][index],
        reason: this.getRecommendationReason(profile, id as ProductLineId, scores[0][index])
      }))
      .sort((a, b) => b.score - a.score)

    return recommendations
  }

  private getRecommendationReason(profile: UserProfile, productLine: ProductLineId, score: number): string {
    const line = PRODUCT_LINES[productLine]
    
    switch (productLine) {
      case 'credit':
        return profile.creditScore > 700 
          ? 'Your excellent credit score qualifies you for premium credit cards'
          : 'Build your credit with our carefully selected card options'
      
      case 'mortgage':
        return profile.income > 100000 
          ? 'Based on your income, you might be interested in our mortgage options'
          : 'Explore our first-time homebuyer programs'
      
      case 'savings':
        const hasLargeTxn = profile.transactionHistory.some(t => t.amount > 5000)
        return hasLargeTxn 
          ? 'Make your large deposits work harder with our high-yield savings'
          : 'Start building your savings with competitive interest rates'
      
      case 'business':
        const hasBusinessTxn = profile.transactionHistory.some(t => t.category === 'business')
        return hasBusinessTxn 
          ? 'Enhance your business operations with our specialized services'
          : 'Start your business journey with our comprehensive solutions'
      
      case 'investment':
        return profile.income > 150000 
          ? 'Maximize your wealth with our premium investment options'
          : 'Begin your investment journey with our guided portfolios'
      
      default:
        return `Explore our ${line.name} products`
    }
  }
}
