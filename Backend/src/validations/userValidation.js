import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).+$/)
    .required(),
});

export const registerSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).+$/)
    .required(),
  username: joi.string().alphanum().min(3).required(),
});
