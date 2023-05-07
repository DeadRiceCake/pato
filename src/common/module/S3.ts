import { AWS_CONFIG } from './../../config/Env';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: AWS_CONFIG.REGION,
  credentials: {
    accessKeyId: AWS_CONFIG.ACCESS_KEY,
    secretAccessKey: AWS_CONFIG.SECRET_KEY,
  },
});

/**
 * 이미지 업로드
 * @param {string} uploadDirectory
 * @param {string} fileName
 */
export const uploadImageToS3 = (uploadDirectory: string, fileName?: string) => {
  return multer({
    storage: multerS3({
      s3: s3Client,
      bucket: AWS_CONFIG.BUCKET,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, callback) => {
        const uploadFileName = fileName
          ? `${fileName}.${file.originalname.split('.')[1]}`
          : `${Date.now()}.${file.originalname.split('.')[1]}`;

        callback(null, `${uploadDirectory}/${uploadFileName}`);
      },
    }),
  });
};
