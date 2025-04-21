import { Router } from "express";
import validate from "../middlewares/validateMiddleware.js";
import { postSchema } from "../validations/postValidation.js";
import verifyToken from "../middlewares/authMiddleware.js";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/postController.js";

const router = Router();

router.post("/", verifyToken, validate(postSchema), createPost);
router.put("/:id", verifyToken, validate(postSchema), updatePost);
router.get("/", getPosts);
router.delete("/:id", verifyToken, deletePost);

export default router;
