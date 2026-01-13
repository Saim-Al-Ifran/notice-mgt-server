import { Notice } from "../models/Notice";
import { INotice } from "../types/models/Notice";
import CustomError from "../utils/errors/customError";
import { uploadFileToCloudinary } from "../utils/fileUpload";

 

/**
 * Create notice
 */
export const createNotice = async (
  noticeData: INotice,
  file?: Express.Multer.File
) => {
  let attachmentUrl: string | undefined;

  if (file) {
    const result = await uploadFileToCloudinary({
      originalname: file.originalname,
      buffer: file.buffer,
      mimetype: file.mimetype,
    });

    attachmentUrl = result.secure_url;
  }

  const notice = new Notice({
    ...noticeData,
    attachmentUrl,
  });

  return await notice.save();
};


/**
 * Get all notices 
 */
export const fetchAllNotices = async (
  status?: string,
  page: number = 1,
  limit: number = 10
) => {
  const filter: any = {};

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const [notices, total] = await Promise.all([
    Notice.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Notice.countDocuments(filter),
  ]);

  return {
    notices,
    pagination: {
      totalItems: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      pageSize: limit,
    },
  };
};

/**
 * Get single notice
 */
export const fetchSingleNotice = async (id: string) => {
  const notice = await Notice.findById(id);

  if (!notice) {
    throw new CustomError("Notice not found", 404);
  }

  return notice;
};

/**
 * Update notice status
 */
export const changeNoticeStatus = async (
  id: string,
  status: "Draft" | "Published" | "Unpublished"
) => {
  if (!["Draft", "Published", "Unpublished"].includes(status)) {
    throw new CustomError("Invalid status value", 400);
  }

  const notice = await Notice.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!notice) {
    throw new CustomError("Notice not found", 404);
  }

  return notice;
};