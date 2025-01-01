export class Queue {
  private items: (() => Promise<void>)[] = []
  private processing: boolean = false

  async enqueue(operation: () => Promise<void>): Promise<void> {
    this.items.push(operation)
  }

  async dequeue(): Promise<(() => Promise<void>) | null> {
    return this.items.shift() || null
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  isProcessing(): boolean {
    return this.processing
  }

  async process(): Promise<void> {
    if (this.processing || this.isEmpty()) {
      return
    }

    this.processing = true

    try {
      while (!this.isEmpty()) {
        const operation = await this.dequeue()
        if (operation) {
          await operation()
        }
      }
    } finally {
      this.processing = false
    }
  }

  clear(): void {
    this.items = []
  }
}
