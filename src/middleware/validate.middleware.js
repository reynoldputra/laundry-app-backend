import createHttpError from "http-errors";
import { z } from "zod";
import { ValidationError } from "../helpers/error.helper.js";

const validate = (schema) =>
  async (req, res, next) => {
    console.log(req)
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.issues)
      }
      throw createHttpError.BadRequest()
    }
};

export default validate
