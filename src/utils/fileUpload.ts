import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

interface UploadedFile {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
}

export const uploadFileToCloudinary = async (
  file: UploadedFile
): Promise<UploadApiResponse> => {
  if (!file) {
    const error = new Error('No file uploaded');
    (error as any).statusCode = 403;
    throw error;
  }

  const publicIdWithoutExtension = `${file.originalname.replace(/\.[^/.]+$/, '')}_${Date.now()}`;

  const b64 = file.buffer.toString('base64');
  const dataURI = `data:${file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'Notice_Mgt/uploads',
    public_id: publicIdWithoutExtension,
  });

  return result;
};
