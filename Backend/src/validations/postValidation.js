import joi from "joi";

export const postSchema = joi.object({
  title: joi.string().max(100).required().messages({
    "string.empty": "Title cannot be empty",
    "string.max": "Title cannot exceed 100 characters",
  }),
  content: joi.string().required().messages({
    "string.empty": "Title cannot be empty",
  }),
  image: joi.string().allow("").optional(),
});
