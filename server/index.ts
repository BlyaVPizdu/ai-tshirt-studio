import express from "express"
import cors from "cors"
const app = express()
const PORT = 3002
app.use(cors())
app.use(express.json())
const designImages = [
  {
    image: "/mockups/knight.jpg",
    tags: ["knight", "sword", "battle", "warrior", "medieval"],
  },
  {
    image: "/mockups/cat.jpg",
    tags: ["cat", "smoking", "tired", "sad"],
  },
]
app.post("/generate", (req, res) => {
  const prompt = req.body.prompt.toLowerCase().split(" ")
  let bestScore = 0
  let bestImage = ""
  designImages.forEach((image) => {const score = 
      image.tags.filter((tag)=> prompt.includes(tag)).length
     if(score > bestScore){
       bestScore = score
       bestImage = image.image
    }})
    if (bestScore === 0) {
    res.json({image: "/mockups/EByblODXYAEO4sY.jpg"})
       }
      res.json({image: bestImage})
      return bestImage
  
})

app.get("/health" , (req, res)=>{
    res.json({"server": "OK"})
})
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))