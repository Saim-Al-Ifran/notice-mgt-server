import { Notice } from "../models/Notice";
import { INotice } from "../types/models/Notice";
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
