import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.empty": "Email is missing",
    "string.email": "Invalid email",
  }),
  password: joi
    .string()
    .pattern(/^(?=.{8,}$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).+$/)
    .required()
    .messages({
      "string.empty": "Password is missing",
      "string.pattern.base": "8+ chars, mix of A-Z, a-z, 0-9 & symbol",
    }),
});

export const registerSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.empty": "Email is missing",
    "string.email": "Invalid email",
  }),
  password: joi
    .string()
    .pattern(/^(?=.{8,}$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).+$/)
    .required()
    .messages({
      "string.empty": "Password is missing",
      "string.pattern.base": "8+ chars, mix of A-Z, a-z, 0-9 & symbol",
    }),
  username: joi.string().trim().min(3).required().messages({
    "string.empty": "Username is missing",
    "string.min": "Username must be at least 3 characters",
  }),
});
