import { Router } from "express";
import { login, logout, refreshAccessToken } from "../controllers/authController";

const router = Router();

router.get("/refresh", refreshAccessToken);
router.post("/login", login);
router.post("/logout", logout);

export default router;