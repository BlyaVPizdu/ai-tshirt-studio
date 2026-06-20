export async function generateImage(prompt: string) {
  const res = await fetch("http://127.0.0.1:8188/system_stats")

  if (!res.ok) {
    throw new Error("ComfyUI is not running")
  }

  const data = await res.json()
  console.log(data)

  return {
    image: "",
  }
}