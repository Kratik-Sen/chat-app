import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { editProfile, getCurrentUser, getOtherUsers, search } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.get("/current",isAuth, getCurrentUser)
userRouter.get("/others",isAuth, getOtherUsers)

// we want to upload only one at a time so we use upload.single
userRouter.put("/profile",isAuth,upload.single("image"),editProfile)
userRouter.get("/search",isAuth, search)


export default userRouter
