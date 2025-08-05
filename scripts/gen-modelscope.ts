import fs from "node:fs"
import type { Model } from "../src/types"

interface ModelScopeModel {
    id: string
    object: string
    owned_by: string
    created: number
}

interface ModelScopeResponse {
    object: string
    data: ModelScopeModel[]
}

// 根据模型ID生成友好的显示名称
function generateName(modelId: string): string {
    const parts = modelId.split("/")
    const name = parts[parts.length - 1]
    return name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("-")
}

// 根据模型ID生成描述和限制信息
function getModelInfo(modelId: string): { description?: string; contextLimit: number; maxOutputLimit: number } {
    const modelData: Record<string, { description?: string; contextLimit: number; maxOutputLimit: number }> = {
        "ZhipuAI/GLM-4.5": { 
            description: "高智能旗舰 - 性能最优，强大的推理能力、代码生成能力以及工具调用能力",
            contextLimit: 131072, 
            maxOutputLimit: 98304 
        },
        "deepseek-ai/DeepSeek-R1-0528": { 
            description: "深度求索R1系列，在多项基准测试中达到SOTA水平",
            contextLimit: 131072, 
            maxOutputLimit: 16384 
        },
        "deepseek-ai/DeepSeek-V3": { 
            description: "深度求索V3系列6710亿参数MoE模型，37B激活参数，在多项基准测试中达到SOTA水平",
            contextLimit: 65536, 
            maxOutputLimit: 8192 
        },
        "deepseek-ai/DeepSeek-R1-Distill-Qwen-32B": { 
            description: "DeepSeek-R1蒸馏版320亿参数模型，基于Qwen架构，推理能力优异",
            contextLimit: 32768, 
            maxOutputLimit: 16384 
        },
        "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B": { 
            description: "DeepSeek-R1蒸馏版140亿参数模型，平衡性能与效率的推理模型",
            contextLimit: 32768, 
            maxOutputLimit: 16384 
        },
        "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B": { 
            description: "DeepSeek-R1蒸馏版70亿参数轻量推理模型，适合快速部署",
            contextLimit: 32768, 
            maxOutputLimit: 16384 
        },
        "deepseek-ai/DeepSeek-R1-Distill-Llama-70B": { 
            description: "DeepSeek-R1蒸馏版700亿参数Llama架构模型，英文推理任务表现突出",
            contextLimit: 32768, 
            maxOutputLimit: 16384 
        },
        "Qwen/Qwen3-235B-A22B": { 
            description: "通义千问3系列最大模型，2350亿参数MoE架构，22B激活参数，支持中英文，具备强大的理解和生成能力",
            contextLimit: 131072, 
            maxOutputLimit: 32768 
        },
        "Qwen/Qwen3-32B": { 
            description: "通义千问3系列320亿参数稠密模型，支持中英文，在多项基准测试中表现优异",
            contextLimit: 131072, 
            maxOutputLimit: 16384 
        },
        "Qwen/Qwen3-14B": { 
            description: "通义千问3系列140亿参数模型，平衡性能与效率，适合中等规模应用场景",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen3-8B": { 
            description: "通义千问3系列80亿参数轻量级模型，推理速度快，适合资源受限场景",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen3-4B": { 
            description: "通义千问3系列40亿参数超轻量模型，移动端和边缘设备部署的理想选择",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen3-1.7B": { 
            description: "通义千问3系列17亿参数微型模型，极致轻量，适合嵌入式应用",
            contextLimit: 32768, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen3-0.6B": { 
            description: "通义千问3系列6亿参数最小模型，超低资源占用，适合极限场景",
            contextLimit: 32768, 
            maxOutputLimit: 8192 
        },
        "Qwen/QwQ-32B-Preview": { 
            description: "通义千问QwQ系列320亿参数推理模型，基于Qwen2.5-32B优化，数学和逻辑推理能力突出",
            contextLimit: 32768, 
            maxOutputLimit: 16384
        },
        "Qwen/QVQ-72B-Preview": { 
            description: "通义千问QVQ系列720亿参数视觉理解模型，支持图像理解和多模态任务",
            contextLimit: 32768, 
            maxOutputLimit: 16384 
        },
        "mistralai/Mistral-Large-Instruct-2407": { 
            description: "Mistral大型指令微调模型，2407版本，支持多语言和长文本处理",
            contextLimit: 32768, 
            maxOutputLimit: 4096 
        },
        "mistralai/Mistral-Small-Instruct-2409": { 
            description: "Mistral小型指令微调模型，2409版本，优化了函数调用和指令遵循",
            contextLimit: 32768, 
            maxOutputLimit: 4096 
        },
        "mistralai/Ministral-8B-Instruct-2410": { 
            description: "Mistral迷你80亿参数指令微调模型，2410版本，移动端部署的理想选择",
            contextLimit: 32768, 
            maxOutputLimit: 4096 
        },
        "LLM-Research/Llama-4-Maverick-17B-128E-Instruct": { 
            description: "Llama 4 Maverick系列170亿参数128专家MoE模型，指令微调版本，多语言支持",
            contextLimit: 430000, 
            maxOutputLimit: 8192 
        },
        "LLM-Research/Llama-4-Scout-17B-16E-Instruct": { 
            description: "Llama 4 Scout系列170亿参数16专家MoE模型，指令微调版本，轻量高效",
            contextLimit: 10000000, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-Coder-32B-Instruct": { 
            description: "通义千问2.5代码专用320亿参数模型，针对代码生成和理解任务优化",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-Coder-14B-Instruct": { 
            description: "通义千问2.5代码专用140亿参数模型，平衡代码能力与推理效率",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-Coder-7B-Instruct": { 
            description: "通义千问2.5代码专用70亿参数轻量模型，适合快速代码补全",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-72B-Instruct": { 
            description: "通义千问2.5系列720亿参数稠密模型，通用能力强，支持中英文",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-32B-Instruct": { 
            description: "通义千问2.5系列320亿参数模型，在多项基准测试中表现优异",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-14B-Instruct": { 
            description: "通义千问2.5系列140亿参数模型，平衡性能与效率",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-7B-Instruct": { 
            description: "通义千问2.5系列70亿参数轻量模型，推理速度快",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2-VL-7B-Instruct": { 
            description: "通义千问2视觉语言70亿参数模型，支持图像理解和视觉问答",
            contextLimit: 32768, 
            maxOutputLimit: 4096 
        },
        "Qwen/Qwen2.5-VL-72B-Instruct": { 
            description: "通义千问2.5视觉语言720亿参数模型，多模态理解能力强",
            contextLimit: 32768, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-VL-32B-Instruct": { 
            description: "通义千问2.5视觉语言320亿参数模型，平衡视觉理解性能",
            contextLimit: 32768, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-VL-7B-Instruct": { 
            description: "通义千问2.5视觉语言70亿参数轻量模型，适合移动端部署",
            contextLimit: 32768, 
            maxOutputLimit: 8192 
        },
        "Qwen/Qwen2.5-VL-3B-Instruct": { 
            description: "通义千问2.5视觉语言30亿参数超轻量模型，边缘设备友好",
            contextLimit: 32768, 
            maxOutputLimit: 8192 
        },
        "opencompass/CompassJudger-1-32B-Instruct": { 
            description: "OpenCompass评测专用320亿参数模型，用于模型能力评估和打分",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "XGenerationLab/XiYanSQL-QwenCoder-32B-2412": { 
            description: "析言SQL专用320亿参数模型，基于QwenCoder优化，数据库查询生成",
            contextLimit: 131072, 
            maxOutputLimit: 8192 
        },
        "Wan-AI/Wan2.1-T2V-1.3B": { 
            description: "万相2.1文本到视频13亿参数模型，支持中英文视频生成",
            contextLimit: 32768, 
            maxOutputLimit: 4096 
        },
    }

    return modelData[modelId] || { contextLimit: 32768, maxOutputLimit: 4096 }
}

async function fetchModelScopeModels(): Promise<Model[]> {
    try {
        const response = await fetch("https://api-inference.modelscope.cn/v1/models")
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: ModelScopeResponse = await response.json()

        return data.data.map((model) => {
            const modelId = model.id
            const name = generateName(modelId)
            const modelInfo = getModelInfo(modelId)
            const price = undefined

            return {
                id: modelId,
                name,
                description: modelInfo.description,
                contextLimit: modelInfo.contextLimit,
                maxOutputLimit: modelInfo.maxOutputLimit,
                price
            }
        })
    } catch (error) {
        console.error("Error fetching models from ModelScope:", error)
        throw error
    }
}

async function main() {
    try {
        console.log("Fetching models from ModelScope API...");

        const models = await fetchModelScopeModels();

        // 确保 data 目录存在
        fs.mkdirSync("data", { recursive: true });

        // 生成 TypeScript 文件
        const output = `import type { Model } from "../src/types"

export default ${JSON.stringify(models, null, 2)} satisfies Model[]
`;

        fs.writeFileSync("data/modelscope.ts", output);
        console.log(`Successfully generated data/modelscope.ts with ${models.length} models`);

    } catch (error) {
        console.error("Failed to generate modelscope data:", error);
        process.exit(1);
    }
}

main()