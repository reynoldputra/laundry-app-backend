import express, { Router } from "express";
import ViteExpress from "vite-express"
import userRouter from "./routes/user.router.js"
import loggingMiddleware from "./middleware/logger.middleware.js";
import errorInterceptor from "./middleware/error.middleware.js";
import 'express-async-errors'
import createHttpError from "http-errors";

const app = express();
app.use(express.json());
app.use(loggingMiddleware)

app.get("/", async (_, res) => {
  throw createHttpError.BadRequest()
  res.send("Hello Vite!");
})

const apiRoutes = new Router()
app.use("/api", apiRoutes)




// add your api routes
apiRoutes.use("/user", userRouter)


app.use(errorInterceptor)


const PORT = process.env.BACKEND_PORT ?? 3000

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
)
