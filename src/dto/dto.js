import { z } from "zod";
import { zj } from "zod-joda";

export const NumberAsStringSchema = z.string().refine(value => !isNaN(Number(value)), {
  message: 'Value must be a valid number or a numeric string',
});

export const NumberOrStringAsNumberSchema = NumberAsStringSchema.transform(value => Number(value));


export const DateSchema = zj.zonedDateTime().transform(date => date.toString());
