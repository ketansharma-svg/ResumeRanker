// import express from "express"
// import router from "./Routes/ResumeRoutes.js"
// import cors from "cors"
// import connectDB from "./DbConnection/DB.js"
// import "dotenv/config"
// import cookieParser from "cookie-parser"
// let app = express()
// let port = 5000


// app.use(express.json())
// app.use(cookieParser())
// connectDB()

// const corsOptions = {
//   origin: [ process.env.FRONTEND_RENDER ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
// }

// app.use(cors(corsOptions))
// app.options("*", cors(corsOptions))



// app.use("/ranking", router)
// app.use((error, req, res, next) => {
//      console.log(error)
//      if (error.code == "LIMIT_FILE_COUNT") {
//           return res.status(400).json({ message: "Limit exsits" })
//      }
// })


// app.listen(port, (req, res) => {
//      console.log(`Server started at Port ${port}`)

// })


import express from "express"
import router from "./Routes/ResumeRoutes.js"
import cors from "cors"
import connectDB from "./DbConnection/DB.js"
import "dotenv/config"
import cookieParser from "cookie-parser"

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
connectDB()

// Allowed origins (exact URLs)
const allowedOrigins = [
  "https://resumeranker-1-xluc.onrender.com", // deployed frontend
  "http://localhost:3000"                     // dev frontend
]

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin)
  }
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200) // allow preflight
  }
  next()
})

// Routes
app.use("/ranking", router)

// Error handler
app.use((error, req, res, next) => {
  console.error(error)
  if (error.code === "LIMIT_FILE_COUNT") return res.status(400).json({ message: "Limit exists" })
  res.status(500).json({ message: error.message || "Internal Server Error" })
})

app.listen(port, () => console.log(`Server started at port ${port}`))
