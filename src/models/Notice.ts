import { Schema, model } from "mongoose";
import { INotice } from "../types/models/Notice";

// Notice Schema  
const noticeSchema = new Schema<INotice>(
  {
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
  },
  { timestamps: true }
);

export const Notice = model<INotice>("Notice", noticeSchema);
