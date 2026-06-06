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
  const sendImage = await generateImage(prompt)
  console.log(sendImage)
  res.json(sendImage)
})

app.get("/health" , (req, res)=>{
    res.json({"server": "OK"})
})

app.listen(PORT)