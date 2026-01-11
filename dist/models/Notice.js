"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = void 0;
const mongoose_1 = require("mongoose");
// Notice Schema  
const noticeSchema = new mongoose_1.Schema({
    targetRecipient: {
        type: String,
        required: true,
        enum: ["Individual", "Department"],
    },
    noticeTitle: {
        type: String,
        required: true,
        trim: true,
    },
    employeeDetails: {
        employeeId: String,
        employeeName: String,
        position: String,
    },
    noticeType: {
        type: String,
        required: true,
        enum: [
            "Warning / Disciplinary",
            "Performance Improvement",
            "Appreciation / Recognition",
            "Attendance / Leave Issue",
            "Payroll / Compensation",
            "Contract / Role Update",
            "Advisory / Personal Reminder",
        ],
    },
    noticeBody: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date,
    },
    attachmentUrl: {
        type: String, // Cloudinary secure_url
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
        default: "Draft",
    },
}, { timestamps: true });
exports.Notice = (0, mongoose_1.model)("Notice", noticeSchema);
