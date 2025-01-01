import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

export class PushNotificationService {
  private static instance: PushNotificationService

  private constructor() {
    this.configure()
  }

  static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService()
    }
    return PushNotificationService.instance
  }

  private async configure() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#009BBF',
      })
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    })
  }

  async registerForPushNotifications() {
    if (!Device.isDevice) {
      throw new Error('Push notifications are only supported on physical devices')
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      throw new Error('Permission not granted for push notifications')
    }

    const token = await Notifications.getExpoPushTokenAsync()
    return token
  }

  async scheduleLocalNotification(
    title: string,
    body: string,
    trigger: Notifications.NotificationTriggerInput = null
  ) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
        badge: 1,
      },
      trigger,
    })
  }

  async scheduleTransactionAlert(amount: number, type: 'credit' | 'debit') {
    const title = type === 'credit' ? 'Payment Received' : 'Payment Sent'
    const body = `${type === 'credit' ? '+' : '-'}$${amount.toFixed(2)} has been ${
      type === 'credit' ? 'credited to' : 'debited from'
    } your account`

    await this.scheduleLocalNotification(title, body)
  }

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }
}
