import * as LocalAuthentication from 'expo-local-authentication'

export class BiometricAuth {
  static async isBiometricAvailable(): Promise<boolean> {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    if (!compatible) return false

    const enrolled = await LocalAuthentication.isEnrolledAsync()
    return enrolled
  }

  static async authenticate(): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access Bank Street',
        fallbackLabel: 'Use passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      })

      return result.success
    } catch (error) {
      console.error('Biometric authentication error:', error)
      return false
    }
  }

  static async getSupportedBiometrics(): Promise<LocalAuthentication.AuthenticationType[]> {
    try {
      return await LocalAuthentication.supportedAuthenticationTypesAsync()
    } catch (error) {
      console.error('Error getting supported biometrics:', error)
      return []
    }
  }
}
