
export async function generateDesignImage(prompt: string): Promise<string>{ 
   const res = await fetch("http://localhost:3002/generate", {
           method: "POST",
          headers: { "Content-Type": "application/json"},
           body: JSON.stringify({prompt})
  })
    const data = await res.json()
    return data.image
  
      
} 
   
