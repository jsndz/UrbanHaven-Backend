import express from "express";
import {
  createUser,
  LoginUser
} from "../../controller/auth-controller.js";

const router = express.Router();

router.post("/auth/signup", createUser);
router.post("/auth/login",LoginUser)

export default router;
