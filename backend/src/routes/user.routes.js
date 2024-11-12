import { Router } from "express";
import { upload } from "../middleware/multerMiddleware.js";
import { resizeImage } from "../middleware/resizeMiddleware.js";
import { createUser, getAllUsers, getUser, updateUser } from "../controllers/userControllers.js";

const router = Router();

router.post("/create", upload.single("avatar"), resizeImage, createUser);

router.get("/get/all", getAllUsers);

router.get("/get/:userId", getUser);

router.patch("/update/:userId", upload.single("avatar"), resizeImage, updateUser);

export default router;