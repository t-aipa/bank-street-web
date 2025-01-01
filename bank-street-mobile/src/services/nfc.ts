import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager'

export class NfcPayment {
  static async init() {
    await NfcManager.start()
  }

  static async isSupported(): Promise<boolean> {
    return await NfcManager.isSupported()
  }

  static async initiatePayment(amount: number, currency: string = 'USD'): Promise<boolean> {
    try {
      // Request NFC technology
      await NfcManager.requestTechnology(NfcTech.Ndef)

      // Create payment payload
      const payload = {
        amount,
        currency,
        timestamp: new Date().toISOString(),
        merchantId: 'BANK_STREET_APP'
      }

      // Convert payload to bytes
      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(JSON.stringify(payload))
      ])

      if (bytes) {
        // Send payment data
        await NfcManager.ndefHandler.writeNdefMessage(bytes)
        return true
      }

      return false
    } catch (error) {
      console.error('NFC payment error:', error)
      return false
    } finally {
      // Clean up
      NfcManager.cancelTechnologyRequest()
    }
  }

  static async readNfcTag(): Promise<any> {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef)
      const tag = await NfcManager.getTag()
      return tag
    } catch (error) {
      console.error('Error reading NFC tag:', error)
      throw error
    } finally {
      NfcManager.cancelTechnologyRequest()
    }
  }

  static cleanup() {
    NfcManager.cancelTechnologyRequest()
  }
}
