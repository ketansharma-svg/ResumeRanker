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
     origin: ["http://localhost:3000",
          "https://resumeranker-1-74jh.onrender.com"],

     methods: ["GET", "POST", "PUT", "DELETE"],
     credentials: true

}
app.use(cors(corsOptions))
app.options("*", cors(corsOptions))



app.use("/ranking", router)
app.use((error, req, res, next) => {
     console.log(error)
     if (error.code == "LIMIT_FILE_COUNT") {
          return res.status(400).json({ message: "Limit exsits" })
     }
})


app.listen(port, (req, res) => {
     console.log(`Server started at Port ${port}`)

})