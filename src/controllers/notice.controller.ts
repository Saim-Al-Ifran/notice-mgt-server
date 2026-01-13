import { Request, Response } from "express";
import { changeNoticeStatus, createNotice, fetchAllNotices, fetchSingleNotice } from "../services/notice.service";
import { TryCatch } from "../middlewares/TryCatch";
 

export const saveNotice = TryCatch(async (req: Request, res: Response) => {
  const noticeData = req.body;
  const file = req.file;

    if (!file) {
    return res.status(400).json({
      message: "Attachment is required",
    });
  }
  const savedNotice = await createNotice(noticeData, file);

  res.status(201).json({
    message: "Notice created successfully",
    data: savedNotice,
  });
});


/**
 * Get all notices 
 * ?status=Published | Draft
 */
export const getAllNotices = TryCatch(async (req: Request, res: Response) => {
  const { status, page = "1", limit = "10" } = req.query;

  const result = await fetchAllNotices(
    status as string,
    Number(page),
    Number(limit)
  );

  res.status(200).json({
    message: "Notices fetched successfully",
    data: result.notices,
    pagination: result.pagination,
  });
});

/**
 * Get single notice
 */
export const getSingleNotice = TryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  const notice = await fetchSingleNotice(id);

  res.status(200).json({
    message: "Notice fetched successfully",
    data: notice,
  });
});


/**
 * Update notice status (publish / unpublish)
 */
export const updateNoticeStatus = TryCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const updatedNotice = await changeNoticeStatus(id, status);

    res.status(200).json({
      message: "Notice status updated successfully",
      data: updatedNotice,
    });
  }
);