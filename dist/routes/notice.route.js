"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const notice_controller_1 = require("../controllers/notice.controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// POST /api/notices
router.post("/", upload.single("attachment"), notice_controller_1.saveNotice);
// Get all notices (filter by status)
router.get("/", notice_controller_1.getAllNotices);
// Get single notice by ID (bonus)
router.get("/:id", notice_controller_1.getSingleNotice);
// Update notice status (publish / unpublish)
router.patch("/:id/status", notice_controller_1.updateNoticeStatus);
exports.default = router;
