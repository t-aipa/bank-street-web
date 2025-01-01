import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/bank-store/product-card'

describe('ProductCard', () => {
  const mockProduct = {
    title: 'Test Card',
    bankName: 'Test Bank',
    description: 'Test Description',
    rating: 4.5,
    features: ['Feature 1', 'Feature 2'],
    ctaText: 'Apply Now',
    onSelect: jest.fn(),
  }

  it('renders product information correctly', () => {
    render(<ProductCard {...mockProduct} />)
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.bankName)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.features[0])).toBeInTheDocument()
    expect(screen.getByText(mockProduct.features[1])).toBeInTheDocument()
  })

  it('calls onSelect when CTA button is clicked', () => {
    render(<ProductCard {...mockProduct} />)
    
    const button = screen.getByText(mockProduct.ctaText)
    fireEvent.click(button)
    
    expect(mockProduct.onSelect).toHaveBeenCalled()
  })
})
