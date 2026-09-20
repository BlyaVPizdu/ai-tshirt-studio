import { Design, Order } from './../src/types/tshirt';
import express from "express"
import cors from "cors"
import multer from "multer"
import { generateImage as generateComfyImage } from "./providers/comfyProvider"
import { getAutoPlacement, applyPlacementCommand } from './providers/placementProvider';
import { generateImage as  generateFluxDevImage } from './providers/fluxdev';
import { prisma } from "./prisma"

const app = express()
const PORT = 3002
app.use(cors())
app.use(express.json())
const orders: Order[] = []

/*
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
*/
function toDesignResponse(design: {
  id: number
  prompt: string
  image: string
  shirtColor: string
  positionX: number
  positionY: number
  width: number
  height: number
  rotation: number
   printMode: string
  baseDesignWidth: number
  baseDesignHeight: number
}) {
  return {
    id: design.id,
    prompt: design.prompt,
    image: design.image,
    shirtColor: design.shirtColor,

    position: {
      x: design.positionX,
      y: design.positionY,
    },

    size: {
      width: design.width,
      height: design.height,
    },

    rotation: design.rotation,
    printMode: design.printMode,

    baseDesignSize: {
      width: design.baseDesignWidth,
      height: design.baseDesignHeight,
    },
  }
}
app.get("/designs", async (req, res) => {
  try {
    const designs = await prisma.design.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    const response = designs.map(toDesignResponse)

    res.json(response)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: "Failed to load designs",
    })
  }
})
app.get("/orders", (req, res)=>{
    res.json(orders)
})
app.post("/designs", async (req, res) => {
  try {
    const {
      prompt,
      image,
      shirtColor,
      position,
      size,
      rotation,
      printMode,
      baseDesignSize,
    } = req.body

    const design = await prisma.design.create({
      data: {
        prompt,
        image,
        shirtColor,

        positionX: position.x,
        positionY: position.y,

        width: size.width,
        height: size.height,

        rotation,
        printMode,

        baseDesignWidth: baseDesignSize.width,
        baseDesignHeight: baseDesignSize.height,
      },
    })

    res
  .status(201)
  .json(toDesignResponse(design))
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: "Failed to create design",
    })
  }
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
    if (selectedProvider === "flux-dev") {
  const result = await generateFluxDevImage(prompt)
  return res.json(result)
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
    return res.status(400).json({
      error: "No file uploaded",
    })
  }

  res.status(201).json({
    imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
  })
})

app.get("/health" , (req, res)=>{
    res.json({"server": "OK"})
})

app.listen(PORT)