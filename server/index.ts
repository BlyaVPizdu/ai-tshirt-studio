import { Design, Order } from './../src/types/tshirt';
import express from "express"
import cors from "cors"
import multer from "multer"
import { generateImage as generateComfyImage } from "./providers/comfyProvider"
import { getAutoPlacement, applyPlacementCommand } from './providers/placementProvider';

const app = express()
const PORT = 3002
app.use(cors())
app.use(express.json())
const designs: Design[] = []
const orders: Order[] = []

/*
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
*/

app.get("/designs", (req, res) => {
  res.json(designs)
})
app.get("/orders", (req, res)=>{
    res.json(orders)
})
app.post("/designs", (req, res) => {
  const design = {
    id: Date.now(),
    ...req.body,
  }

  designs.push(design)

  res.status(201).json(design)
})
app.post("/orders", (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
  }

  orders.push(order)

  res.status(201).json(order)
})
app.post("/generate", async (req, res) => {
  try {
    const { prompt, selectedProvider } = req.body

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Prompt is required"
      })
    }

    if (selectedProvider === "openai") {
      return res.status(501).json({
        error: "Provider not implemented"
      })
    }

    if (selectedProvider === "comfy") {
  const result = await generateComfyImage(prompt)
  return res.json(result)
}

    return res.status(400).json({
      error: "Unknown provider"
    })
  } catch (error) {
  console.error(error)
  return res.status(500).json({
    error: "Image generation failed"
  })
  }
})
app.post("/design-command", async (req, res) => {
  const result = await applyPlacementCommand(req.body)
  res.json(result)
})
app.post("/auto-placement", (req, res) => {
  const result = getAutoPlacement()
  res.json(result)
})
app.use("/uploads", express.static("uploads"))

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})
  
const upload = multer({ storage })

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" })
  }

  res.json({
    imageUrl: `/uploads/${req.file.filename}`,
  })
})


app.get("/health" , (req, res)=>{
    res.json({"server": "OK"})
})

app.listen(PORT)