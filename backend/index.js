import express from "express"
import dotenv from 'dotenv'
import connectDb from "./config/db.js"
import cors from 'cors'
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import messageRouter from "./routes/message.routes.js"
import { app, server } from "./socket/socket.js"
dotenv.config()


const PORT = process.env.PORT || 8000

// const app = express()
app.use(cors({
    origin:"https://chat-app-dsdv.onrender.com",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)

// app.listen(PORT,()=>{
//   connectDb()
//   console.log(`server is running at port ${PORT}`);
// })
server.listen(PORT,()=>{
  connectDb()
  console.log(`server is running at port ${PORT}`);
})
