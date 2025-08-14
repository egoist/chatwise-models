import type { Model } from "../src/types"

export default [
  {
    type: "chat",
    id: "glm-4.5",
    name: "GLM-4.5",
    description:
      "High-performance flagship model with strong reasoning, code generation, and tool calling capabilities",
    contextLimit: 128_000,
    maxOutputLimit: 64_000,
    price: {
      inputText: 0.6,
      outputText: 2.2,
      currency: "USD",
    },
  },
  {
    type: "chat",
    id: "glm-4.5v",
    name: "GLM-4.5V",
    description: "Visual language model supporting both English and Chinese",
    contextLimit: 64_000,
    maxOutputLimit: 32_000,
    price: {
      inputText: 0.6,
      outputText: 1.8,
      currency: "USD",
    },
    supportedMimes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  },
  {
    type: "chat",
    id: "glm-4.5-x",
    name: "GLM-4.5-X",
    description: "Premium model with enhanced capabilities",
    contextLimit: 128_000,
    maxOutputLimit: 64_000,
    price: {
      inputText: 2.2,
      outputText: 8.9,
      currency: "USD",
    },
  },
  {
    type: "chat",
    id: "glm-4.5-air",
    name: "GLM-4.5-Air",
    description:
      "Cost-effective model with strong performance in reasoning, coding, and agent tasks",
    contextLimit: 128_000,
    maxOutputLimit: 64_000,
    price: {
      inputText: 0.2,
      outputText: 1.1,
      currency: "USD",
    },
  },
  {
    type: "chat",
    id: "glm-4.5-airx",
    name: "GLM-4.5-AirX",
    description: "Fast inference model with balanced price and performance",
    contextLimit: 128_000,
    maxOutputLimit: 64_000,
    price: {
      inputText: 1.1,
      outputText: 4.5,
      currency: "USD",
    },
  },
  {
    type: "chat",
    id: "glm-4.5-flash",
    name: "GLM-4.5-Flash",
    description: "Free model for all usage",
    contextLimit: 128_000,
    maxOutputLimit: 64_000,
  },
] satisfies Model[]
