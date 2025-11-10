import express from 'express';
import userDetailsModel from '../models/userDetailsModel.js';
import { upload } from '../config/cloudinary.js';

const userDetailsRoutes = express.Router();

userDetailsRoutes.post('/user-data', upload.single('profile'), async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;
    const profileUrl = req.file ? req.file.path : null;

    const user = new userDetailsModel({
      username,
      email,
      password,
      bio,
      profile: profileUrl,
    });

    await user.save();
    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

userDetailsRoutes.get('/user-details', async (req, res) => {
  try {
    const { email } = req.query;
    let users;

    if (email) {
      users = await userDetailsModel.findOne({ email });
      return res.json({ users });
    } else {
      users = await userDetailsModel.find({});
      return res.json({ users });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

userDetailsRoutes.put('/upload/story/:userId',
  upload.single('file'), async (req, res) => {
    try {
      const { userId } = req.params;

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const fileType = req.file.mimetype?.startsWith('video') ? 'video' : 'image';
      const caption = typeof req.body.caption === 'string' ? req.body.caption : null;

      const updatedUser = await userDetailsModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            'storyFile.url': req.file.path,
            'storyFile.caption': caption || null,
            'storyFile.type': fileType,
            'storyFile.createdAt': new Date(),
          }
        },
        { new: true, runValidators: true }
      );


      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('Story File being sent:', updatedUser.storyFile);
      return res.status(200).json({
        message: 'Story uploaded successfully',
        storyFile: updatedUser.storyFile,
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ message: error.message });
    }
  }
);

userDetailsRoutes.delete('/delete/story/:storyId', async (req, res) => {
  try {
    const { storyId } = req.params;

    const deletedStory = await userDetailsModel.findByIdAndDelete(storyId);
    if (!deletedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }

    return res.status(200).json({ message: 'Story deleted successfully', deletedStory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


userDetailsRoutes.put('/following', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const sender = await userDetailsModel.findById(senderId);
    const receiver = await userDetailsModel.findById(receiverId);

    sender.following.push({
      userId: receiver._id,
      email: receiver.email,
      connection: false,
    });

    receiver.followers.push({
      userId: sender._id,
      email: sender.email,
      connection: false,
    });

    await sender.save();
    await receiver.save();

    return res.status(200).json({ message: 'Followed' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default userDetailsRoutes;
