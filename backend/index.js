import express from "express"
import dotenv from "dotenv"
import db from "./config/database.js"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import promtRoutes from "./routes/promt.route.js"
import userMiddleware from "./middleware/promt.middleware.js"
import cors from "cors"

dotenv.config()
const App = express();
const port = process.env.PORT||4000;
App.use(express.json())
App.use(cookieParser())




db()

// routes
App.use("/api/v1/user",userRoutes)
App.use("/api/v1/deepseekai",userMiddleware,promtRoutes)

App.listen(port,()=>{
    console.log(`the backend is running in ${port}`)
});