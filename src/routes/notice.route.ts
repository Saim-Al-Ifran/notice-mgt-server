import { Router } from "express";
import multer from "multer";
import { saveNotice } from "../controllers/notice.controller";

const router = Router();
const upload = multer(); // memory storage by default

// POST /api/notices
router.post("/notices", upload.single("attachment"), saveNotice);

export default router;
