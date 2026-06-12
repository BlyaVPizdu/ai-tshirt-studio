import type { AiProvider } from "../types/tshirt"

export async function generateDesignImage(prompt: string, selectedProvider: AiProvider): Promise<string>{ 
   const res = await fetch("http://localhost:3002/generate", {
           method: "POST",
          headers: { "Content-Type": "application/json"},
           body: JSON.stringify({prompt, selectedProvider})
  })
    const data = await res.json()
    if (!res.ok) {
    throw new Error(data.error || "Generation failed")
    }
    return data.image
  
      
} 
   
