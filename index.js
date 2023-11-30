import express, { Router } from "express";
import loggingMiddleware from "./src/middleware/logger.middleware.js";
import errorInterceptor from "./src/middleware/error.middleware.js";
import userRouter from "./src/routes/user.router.js"
import serviceRouter from "./src/routes/service.router.js";
import orderRouter from "./src/routes/order.router.js";
import 'express-async-errors'

const app = express();
app.use(express.json());
app.use(loggingMiddleware)

app.get("/", async (_, res) => {
  res.send("Hello World!");
})

const apiRoutes = new Router()
app.use("/api", apiRoutes)


// add your api routes
apiRoutes.use("/user", userRouter)
apiRoutes.use("/service", serviceRouter)
apiRoutes.use("/order", orderRouter)


app.use(errorInterceptor)


const PORT = process.env.BACKEND_PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
})

module.exports = app
