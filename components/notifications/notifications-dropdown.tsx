'use client'

import * as React from 'react'
import {
  Bell,
  CheckCircle2,
  Info,
  AlertCircle,
  XCircle,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'

type NotificationType = 'info' | 'warning' | 'success' | 'error'

interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  createdAt: Date
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Payment Successful',
    message: 'Your payment of $50.00 has been processed successfully.',
    type: 'success',
    read: false,
    createdAt: new Date('2025-01-01T12:00:00'),
  },
  {
    id: '2',
    title: 'Security Alert',
    message: 'Unusual login attempt detected from a new device.',
    type: 'warning',
    read: false,
    createdAt: new Date('2025-01-01T11:30:00'),
  },
  {
    id: '3',
    title: 'Account Update',
    message: 'Your account details have been updated successfully.',
    type: 'info',
    read: true,
    createdAt: new Date('2025-01-01T10:00:00'),
  },
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'info':
      return <Info className="h-4 w-4 text-blue-500" />
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    case 'success':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />
  }
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = React.useState<Notification[]>(
    mockNotifications
  )
  const [open, setOpen] = React.useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground"
              onClick={clearAll}
            >
              Clear all
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex cursor-pointer flex-col space-y-1 p-4"
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getNotificationIcon(notification.type)}
                    <span className="font-medium">{notification.title}</span>
                  </div>
                  {!notification.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <span className="text-xs text-muted-foreground">
                  {format(notification.createdAt, 'MMM d, h:mm a')}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
