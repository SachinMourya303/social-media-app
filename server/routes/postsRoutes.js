import express from 'express'
import postsModel from '../models/postsModel.js';
import { upload } from '../config/cloudinary.js';

const postsRoutes = express.Router();

postsRoutes.post('/create',
    upload.single('file'), async (req, res) => {
        try {
            const { userId } = req.body;

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const fileType = req.file.mimetype?.startsWith('video') ? 'video' : 'image';
            const profile = typeof req.body.profile === 'string' ? req.body.profile : null;
            const username = typeof req.body.username === 'string' ? req.body.username : null;
            const email = typeof req.body.email === 'string' ? req.body.email : null;
            const caption = typeof req.body.caption === 'string' ? req.body.caption : null;

            const updatedUser = await postsModel.create(
                {
                    'userId': userId,
                    'profile': profile,
                    'username': username,
                    'email': email,
                    'url': req.file.path,
                    'caption': caption || null,
                    'type': fileType,
                }
            );


            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json({
                message: 'Post uploaded'
            });
        } catch (error) {
            console.error('Upload error:', error);
            return res.status(500).json({ message: error.message });
        }
    }
);

postsRoutes.get('/allposts', async (req, res) => {
    try {
        const posts = await postsModel.find({});
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

export default postsRoutes;