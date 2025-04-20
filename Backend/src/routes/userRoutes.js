import { Router } from "express";
import { loginSchema, registerSchema } from "../validations/userValidation.js";
import validate from "../middlewares/validateMiddleware.js";
import {
  authController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", validate(loginSchema), loginController);
router.post("/logout", logoutController);
router.post("/register", validate(registerSchema), registerController);

router.get("/", verifyToken, authController);
export default router;
