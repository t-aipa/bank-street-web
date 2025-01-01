import { render, screen, fireEvent } from '@testing-library/react'
import { NotificationsDropdown } from '@/components/notifications/notifications-dropdown'

describe('NotificationsDropdown', () => {
  it('renders notifications dropdown', () => {
    render(<NotificationsDropdown />)
    
    const button = screen.getByLabelText('Notifications')
    expect(button).toBeInTheDocument()
  })

  it('shows notifications when clicked', () => {
    render(<NotificationsDropdown />)
    
    fireEvent.click(screen.getByLabelText('Notifications'))
    
    expect(screen.getByText('Payment Successful')).toBeInTheDocument()
    expect(screen.getByText('Security Alert')).toBeInTheDocument()
  })

  it('marks notifications as read', () => {
    render(<NotificationsDropdown />)
    
    fireEvent.click(screen.getByLabelText('Notifications'))
    fireEvent.click(screen.getByText('Payment Successful'))
    
    // The unread indicator should be removed
    expect(screen.queryByTestId('unread-indicator')).not.toBeInTheDocument()
  })

  it('clears all notifications', () => {
    render(<NotificationsDropdown />)
    
    fireEvent.click(screen.getByLabelText('Notifications'))
    fireEvent.click(screen.getByText('Clear all'))
    
    expect(screen.getByText('No notifications')).toBeInTheDocument()
  })
})
