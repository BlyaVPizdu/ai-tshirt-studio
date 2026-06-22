import { workflow } from "../workflows/flux_api"
const COMFY_URL = "http://100.107.54.38:8188"

export async function generateImage(prompt: string) {
  const promptWorkflow = structuredClone(workflow)
  promptWorkflow["6"].inputs.text = prompt
  promptWorkflow["3"].inputs.seed = Math.floor(Math.random() * 1000000000000000)
  const res = await fetch(`${COMFY_URL}/prompt`,{
     method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: promptWorkflow,
  }),
  })
  const data = await res.json()
  console.log(data)
 
  const history = await waitForHistory(data.prompt_id)
const images = history.outputs?.["9"]?.images


if (!images || images.length === 0) {
  throw new Error("No images in ComfyUI history")
}

const imageData = images[0]

const imageUrl =
  `${COMFY_URL}/view?filename=${encodeURIComponent(imageData.filename)}` +
  `&subfolder=${encodeURIComponent(imageData.subfolder ?? "")}` +
  `&type=${encodeURIComponent(imageData.type)}` +
  `&t=${Date.now()}`



return {
  image: imageUrl,
}
}
async function waitForHistory(promptId: string) {
  for (let i = 0; i < 30; i++) {
    const res = await fetch(`${COMFY_URL}/history/${promptId}`)
    const history = await res.json()

    const result = history[promptId]

    const saveImageOutput = result?.outputs?.["9"]

if (saveImageOutput?.images?.length > 0) {
  return result
}

    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  throw new Error("Generation timeout")
}