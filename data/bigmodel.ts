import type { Model } from "../src/types"

export default [
  {
    id: "glm-4.5",
    name: "GLM-4.5",
    description:
      "高智能旗舰 - 性能最优，强大的推理能力、代码生成能力以及工具调用能力",
    contextLimit: 128_000,
    maxOutputLimit: 96_000,
    price: {
      inputText: 0.8,
      outputText: 2.0,
      currency: "CNY",
    },
  },
  {
    id: "glm-4.5-air",
    name: "GLM-4.5-Air",
    description:
      "高性价比 - 同参数规模性能最佳，在推理、编码和智能体任务上表现强劲",
    contextLimit: 128_000,
    maxOutputLimit: 96_000,
    price: {
      inputText: 0.8,
      outputText: 2.0,
      currency: "CNY",
    },
  },
  {
    id: "glm-4.5-x",
    name: "GLM-4.5-X",
    description:
      "高智能旗舰-极速版 - 推理速度更快，适用于搜索问答、智能助手、实时翻译等时效性较强场景",
    contextLimit: 128_000,
    maxOutputLimit: 96_000,
    price: {
      inputText: 0.8,
      outputText: 2.0,
      currency: "CNY",
    },
  },
  {
    id: "glm-4.5-airx",
    name: "GLM-4.5-AirX",
    description:
      "高性价比-极速版 - 推理速度快，且价格适中，适用于时效性有较强要求的场景",
    contextLimit: 128_000,
    maxOutputLimit: 96_000,
    price: {
      inputText: 0.8,
      outputText: 2.0,
      currency: "CNY",
    },
  },
  {
    id: "glm-4.5-flash",
    name: "GLM-4.5-Flash",
    description: "免费模型 - 最新基座模型的普惠版本",
    contextLimit: 128_000,
    maxOutputLimit: 96_000,
  },
  {
    id: "glm-4-plus",
    name: "GLM-4-Plus",
    description:
      "性能优秀 - 性能最优，语言理解、逻辑推理、指令遵循、长文本处理效果领先",
    contextLimit: 128_000,
    maxOutputLimit: 4_000,
    price: {
      inputText: 5.0,
      outputText: 5.0,
      currency: "CNY",
    },
  },
  {
    id: "glm-4-air-250414",
    name: "GLM-4-Air-250414",
    description: "高性价比 - 快速执行复杂任务，擅长工具调用、联网搜索、代码",
    contextLimit: 128_000,
    maxOutputLimit: 16_000,
    price: {
      inputText: 5.0,
      outputText: 5.0,
      currency: "CNY",
    },
  },
  {
    id: "glm-4-airx",
    name: "GLM-4-AirX",
    description: "极速推理 - 超快的推理速度，强大的推理效果",
    contextLimit: 8_000,
    maxOutputLimit: 4_000,
    price: {
      inputText: 5.0,
      outputText: 5.0,
      currency: "CNY",
    },
  },
  {
    id: "glm-4-flashx",
    name: "GLM-4-FlashX",
    description: "高速低价 - Flash 增强版本，超快推理速度，更快并发保障",
    contextLimit: 128_000,
    maxOutputLimit: 16_000,
    price: {
      inputText: 5.0,
      outputText: 5.0,
      currency: "CNY",
    },
  },
  {
    id: "glm-4-flashx-250414",
    name: "GLM-4-FlashX-250414",
    description: "高速低价 - Flash 增强版本，超快推理速度，更快并发保障",
    contextLimit: 128_000,
    maxOutputLimit: 16_000,
    price: {
      inputText: 5.0,
      outputText: 5.0,
      currency: "CNY",
    },
  },
  {
    id: "glm-z1-air",
    name: "GLM-Z1-Air",
    description: "高性价比 - 高性价比，具备深度思考能力，数理推理能力显著增强",
    contextLimit: 128_000,
    maxOutputLimit: 32_000,
    price: {
      inputText: 0.5,
      outputText: 0.5,
      currency: "CNY",
    },
  },
  {
    id: "glm-z1-airx",
    name: "GLM-Z1-AirX",
    description:
      "极速推理 - 国内最快的推理速度，支持 8 倍推理速度，问题即问即答",
    contextLimit: 32_000,
    maxOutputLimit: 30_000,
    price: {
      inputText: 0.5,
      outputText: 0.5,
      currency: "CNY",
    },
  },
  {
    id: "glm-z1-flash",
    name: "GLM-Z1-Flash",
    description: "免费模型 - 复杂任务推理，轻量级应用",
    contextLimit: 128_000,
    maxOutputLimit: 32_000,
  },
  {
    id: "glm-z1-flashx",
    name: "GLM-Z1-FlashX",
    description: "高速低价 - 超快推理速度，更快并发保障，极致性价比",
    contextLimit: 128_000,
    maxOutputLimit: 32_000,
    price: {
      inputText: 0.5,
      outputText: 0.5,
      currency: "CNY",
    },
  },
] satisfies Model[]
