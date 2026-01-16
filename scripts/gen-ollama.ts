import { load } from "cheerio"
import fs from "node:fs"

async function extractModels() {
  const models: { id: string; description: string; sizes: string[] }[] = []
  const seen = new Set<string>()
  const maxPages = 200

  for (let page = 1; page <= maxPages; page++) {
    console.log(`fetching page ${page}`)
    const res = await fetch(`https://ollama.com/search?page=${page}&o=newest`)
    const $ = load(await res.text())

    const pageModels: { id: string; description: string; sizes: string[] }[] =
      []

    $("[x-test-model]").each((_, el) => {
      const id = $(el).find("[x-test-search-response-title]").text()
      const description = $(el).find("p").first().text()
      const sizes: string[] = []

      const hasCloud = $(el)
        .find("a")
        .find("div")
        .last()
        .text()
        .includes("cloud")

      if (hasCloud) {
        sizes.push("cloud")
      }

      $(el)
        .find("[x-test-size]")
        .each((_, sizeEl) => {
          sizes.push($(sizeEl).text())
        })

      if (id && !seen.has(id)) {
        seen.add(id)
        if (sizes.length > 0) {
          pageModels.push({
            id,
            description,
            sizes,
          })
        }
      }
    })

    if (pageModels.length === 0) break
    models.push(...pageModels)
  }

  return await Promise.all(
    models.map(async (m) => {
      const res = await fetch(`https://ollama.com/library/${m.id}`)
      if (!res.ok)
        throw new Error(`Failed to fetch model details: ${res.status}`)
      const $ = load(await res.text())

      let defaultSize = ""
      $("a").each((_, el) => {
        if (
          $(el).attr("href")?.includes("/library/") &&
          $(el).next().text() === "latest"
        )
          defaultSize = $(el).text().split(":")[1]
      })

      return {
        ...m,
        defaultSize,
      }
    })
  )
}

async function main() {
  fs.mkdirSync("gen", { recursive: true })

  fs.writeFileSync(
    "gen/ollama-models.js",
    `export const models = ${JSON.stringify(await extractModels())}`
  )
}

main()
