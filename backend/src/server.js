// server file

import express from "express";
import noteroutes from "./routes/notesRoutes.js"
import { mongoDBConnection } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors'
dotenv.config();

const app = express();
const port = process.env.PORT || 5001


app.use(cors({
    origin:"http://localhost:5173",
}))
app.use(rateLimiter)
//middleware
app.use(express.json())


app.use("/api/notes", noteroutes)

mongoDBConnection().then(() => {
    app.listen(port, () => {
        console.log(`server started at port: ${port}`)
    })
})
