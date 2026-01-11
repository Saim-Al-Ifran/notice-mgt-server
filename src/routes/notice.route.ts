import { Router } from "express";
import multer from "multer";
import {
    getAllNotices,
    getSingleNotice,
    saveNotice,
    updateNoticeStatus
} from "../controllers/notice.controller";

const router = Router();
const upload = multer(); 

// POST /api/notices
router.post("/", upload.single("attachment"), saveNotice);
// Get all notices (filter by status)
router.get("/", getAllNotices);
// Get single notice by ID (bonus)
router.get("/:id", getSingleNotice);
// Update notice status (publish / unpublish)
router.patch("/:id/status", updateNoticeStatus);

export default router;
