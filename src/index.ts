import { Hono } from "hono"
import { cors } from "hono/cors"

// Start a Hono app
const app = new Hono<{ Bindings: Env }>()

app.use(cors())

app.onError((err, c) => {
  console.error("Global error handler caught:", err) // Log the error if it's not known

  // For other errors, return a generic 500 response
  return c.json(
    {
      success: false,
      errors: [{ code: 7000, message: "Internal Server Error" }],
    },
    500,
  )
})

app.get("/", (c) => {
  return c.text("buy chatwise to support me ;)")
})

app.get("/ollama", async (c) => {
  // @ts-expect-error
  const { models } = await import("../gen/ollama-models.js")
  return c.json({ models })
})

app.get("/bigmodel", async (c) => {
  const { default: models } = await import("../data/bigmodel.js")
  return c.json({ models })
})

// Export the Hono app
export default app
