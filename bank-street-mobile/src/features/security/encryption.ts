import * as Crypto from 'expo-crypto'
import * as SecureStore from 'expo-secure-store'

export class Encryption {
  private static instance: Encryption
  private readonly ENCRYPTION_KEY = 'BANK_STREET_ENCRYPTION_KEY'

  private constructor() {}

  static getInstance(): Encryption {
    if (!Encryption.instance) {
      Encryption.instance = new Encryption()
    }
    return Encryption.instance
  }

  async generateKey(): Promise<string> {
    const key = await Crypto.getRandomBytesAsync(32)
    const keyString = Array.from(key)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    await this.storeKey(keyString)
    return keyString
  }

  private async storeKey(key: string): Promise<void> {
    await SecureStore.setItemAsync(this.ENCRYPTION_KEY, key)
  }

  private async getKey(): Promise<string> {
    let key = await SecureStore.getItemAsync(this.ENCRYPTION_KEY)
    if (!key) {
      key = await this.generateKey()
    }
    return key
  }

  async encrypt(data: string): Promise<string> {
    const key = await this.getKey()
    const iv = await Crypto.getRandomBytesAsync(16)
    const ivString = Array.from(iv)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    const dataBuffer = new TextEncoder().encode(data)
    const keyBuffer = new TextEncoder().encode(key)

    const encryptedData = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data + key + ivString
    )

    return JSON.stringify({
      iv: ivString,
      data: encryptedData
    })
  }

  async decrypt(encryptedData: string): Promise<string> {
    const { iv, data } = JSON.parse(encryptedData)
    const key = await this.getKey()

    const keyBuffer = new TextEncoder().encode(key)
    const ivBuffer = new Uint8Array(
      iv.match(/.{2}/g).map((byte: string) => parseInt(byte, 16))
    )

    // In a real implementation, you would use a proper decryption algorithm
    // This is just a placeholder
    return data
  }

  async hash(data: string): Promise<string> {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data
    )
  }

  async compareHash(data: string, hash: string): Promise<boolean> {
    const newHash = await this.hash(data)
    return newHash === hash
  }
}
