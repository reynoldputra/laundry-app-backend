import createHttpError from "http-errors"
import { ValidationError } from "../helpers/error.helper.js"

const errorInterceptor = (err, req, res, next) => {
  console.log(err)
  if(err instanceof ValidationError) {
    res.status(400).json({
      status: false,
      message: err.message,
      data: err.data ?? []
    })
  }

  if(createHttpError.isHttpError(err)) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
    })
  }

  res.status(500).json({
    status: false,
    message: "Internal server error"
  })
}


export default errorInterceptor
