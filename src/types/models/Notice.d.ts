import { Schema, model, Document } from "mongoose";

 
/**
 * Main Notice document interface
 */
export interface INotice extends Document {
  targetRecipient: "Individual" | "Department";
  noticeTitle: string;
  employeeId?: string;
  employeeName?: string;
  position?: string;
  noticeType:
    | "Warning / Disciplinary"
    | "Performance Improvement"
    | "Appreciation / Recognition"
    | "Attendance / Leave Issue"
    | "Payroll / Compensation"
    | "Contract / Role Update"
    | "Advisory / Personal Reminder";
  noticeBody: string;
  publishDate?: Date;
  attachmentUrl?: string; // Cloudinary URL
  status: "Draft" | "Published";
  createdAt: Date;
  updatedAt: Date;
}