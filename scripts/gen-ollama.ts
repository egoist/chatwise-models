import { load } from "cheerio"
import fs from "node:fs"

async function extractModels() {
  const res = await fetch("https://ollama.com/search?o=newest")
  const $ = load(await res.text())

  const models: { id: string; description: string; sizes: string[] }[] = []

  // Adjust the selector based on the actual HTML structure of the page
  $("[x-test-model]").each((i, el) => {
    const id = $(el).find("[x-test-search-response-title]").text()
    const description = $(el).find("p").first().text()
    const sizes: string[] = []

    $(el)
      .find("[x-test-size]")
      .each((_, sizeEl) => {
        sizes.push($(sizeEl).text())
      })

    models.push({
      id,
      description,
      sizes,
    })
  })

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
    }),
  )
}

async function main() {
  fs.mkdirSync("gen", { recursive: true })

  fs.writeFileSync(
    "gen/ollama-models.js",
    `export const models = ${JSON.stringify(await extractModels())}`,
  )
}

main()
