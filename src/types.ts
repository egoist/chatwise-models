export type Model = {
  id: string
  name: string
  description?: string
  contextLimit: number
  maxOutputLimit: number
  /** dollar per million tokens */
  price?: {
    inputText?: number
    outputText?: number
    currency?: "USD" | "CNY"
  }
}
