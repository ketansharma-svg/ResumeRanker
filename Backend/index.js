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

// Middleware
app.use(express.json())
app.use(cookieParser())
connectDB()

// Allowed origins
const allowedOrigins = [
  process.env.FRONTEND_RENDER,      // Render frontend
  "http://localhost:3000"           // Local dev frontend
]

// Dynamic CORS setup
const corsOptions = {
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true)

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("CORS not allowed for origin: " + origin))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

// Apply CORS
app.use(cors(corsOptions))
app.options("*", cors(corsOptions)) // handle preflight requests

// Routes
app.use("/ranking", router)

// Error handling
app.use((error, req, res, next) => {
  console.log(error)
  if (error.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({ message: "Limit exists" })
  }
  res.status(500).json({ message: error.message || "Internal Server Error" })
})

// Start server
app.listen(port, () => {
  console.log(`Server started at Port ${port}`)
})
