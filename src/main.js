import express, { Router } from "express";
import ViteExpress from "vite-express"
import userRouter from "./routes/user.router.js"
import loggingMiddleware from "./middleware/logger.middleware.js";

const app = express();
app.use(express.json());
app.use(loggingMiddleware)

app.get("/", (_, res) => {
  res.send("Hello Vite!");
});

const apiRoutes = new Router()
app.use("/api", apiRoutes)




// add your api routes
apiRoutes.use("/user", userRouter)




const PORT = process.env.BACKEND_PORT ?? 3000

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
