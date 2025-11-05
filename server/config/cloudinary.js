import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = 'image';
    let allowedFormats = ['jpg', 'jpeg', 'png'];
    let folder = 'user_data';

    if (file.mimetype.startsWith('video/')) {
      resourceType = 'video';
      allowedFormats = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
      folder = 'user_videos';
    } else if (file.mimetype.startsWith('image/')) {
      folder = 'user_images';
    }

    return {
      folder,
      resource_type: resourceType,
      allowed_formats: allowedFormats,
      transformation:
        resourceType === 'image'
          ? [{ width: 500, height: 500, crop: 'limit' }]
          : undefined,
    };
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
