import express from "express"
import {loginUser , registeUser} from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register",registeUser)
userRouter.post("/login",loginUser)

export default userRouter;