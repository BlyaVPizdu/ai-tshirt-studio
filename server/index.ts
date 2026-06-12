import express from "express"
import cors from "cors"
import { generateImage } from "./providers/pollinationsProvider"
const app = express()
const PORT = 3002
app.use(cors())
app.use(express.json())

/*
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
*/
app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt
  if(req.body.selectedProvider === "pollinations"){
    const sendImage = await generateImage(prompt)
    return res.json(sendImage)
  }
  if(req.body.selectedProvider === "openai"){
  return  res.status(501).json({
  error: "Provider not implemented"
})}
if(req.body.selectedProvider === "comfy"){
    return res.status(501).json({
  error: "Provider not implemented"
})}
  else {
    return res.status(400).json({
     error: "Unknown provider"
})
  }
})

app.get("/health" , (req, res)=>{
    res.json({"server": "OK"})
})

app.listen(PORT)