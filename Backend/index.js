import express from "express"

let app = express()
let port=5000


app.use(express.json())


app.listen(port,(req,res)=>{
     console.log(`Server started at Port ${port}`)
})