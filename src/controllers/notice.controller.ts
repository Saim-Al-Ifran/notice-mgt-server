import { Request, Response } from "express";
import { createNotice } from "../services/notice.service";
import { TryCatch } from "../middlewares/TryCatch";
 

export const saveNotice = TryCatch(async (req: Request, res: Response) => {
  const noticeData = req.body;
  const file = req.file;

  const savedNotice = await createNotice(noticeData, file);

  res.status(201).json({
    message: "Notice created successfully",
    data: savedNotice,
  });
});
