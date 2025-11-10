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
    let allowedFormats = ['jpg', 'jpeg', 'png', 'webp'];
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
          ? [{ crop: 'limit' }] 
          : undefined,

      eager:
        resourceType === 'image'
          ? [
              { width: 1600, height: 900, crop: 'fill', gravity: 'auto' },
              { width: 3200, height: 1800, crop: 'fill', gravity: 'auto' },
            ]
          : undefined,
    };
  },
});

const upload = multer({ storage });

export { cloudinary, upload };
