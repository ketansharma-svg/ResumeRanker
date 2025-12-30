import express from "express"
import router from "./Routes/ResumeRoutes.js"
import cors from "cors"
import connectDB from "./DbConnection/DB.js"
import "dotenv/config"
import cookieParser from "cookie-parser"
let app = express()
let port = 5000


app.use(express.json())
app.use(cookieParser())
connectDB()

const corsOptions = {
     origin: process.env.FrontendLocalUrl,
     methods: ["GET", "POST", "PUT", "DELETE"],
     credentials: true

}
app.use(cors(corsOptions))




app.use("/ranking", router)
app.listen(port, (req, res) => {
     console.log(`Server started at Port ${port}`)

})