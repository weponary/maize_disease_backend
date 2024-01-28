import express from "express";
import authRouter from "../auth/authRouter";
import userRouter from "../user/userRouter";
import detectRouter from "../detect/detectRouter";

const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/detect", detectRouter);

export default router;
