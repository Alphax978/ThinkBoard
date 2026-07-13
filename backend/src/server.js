// server file

import express from "express";
import noteroutes from "./routes/notesRoutes.js"
import { mongoDBConnection } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path"
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 5001
const __dirname = path.resolve()


if (process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173",
    }))
}
app.use(rateLimiter)
//middleware
app.use(express.json())
app.use("/api/notes", noteroutes)

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
    })
}


mongoDBConnection().then(() => {
    app.listen(port, () => {
        console.log(`server started at port: ${port}`)
    })
})
