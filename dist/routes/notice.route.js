"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const notice_controller_1 = require("../controllers/notice.controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(); // memory storage by default
// POST /api/notices
router.post("/notices", upload.single("attachment"), notice_controller_1.saveNotice);
exports.default = router;
