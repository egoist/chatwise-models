export type Model =
  | {
      type: "chat"
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
      supportedMimes?: string[]
    }
  | {
      type: "image"
      id: string
      name: string
      description?: string
      // support openai image edit api
      canEdit?: boolean
    }
