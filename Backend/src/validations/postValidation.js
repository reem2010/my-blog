import joi from "joi";

export const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  image: joi.string().required(),
});
