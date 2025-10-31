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

    return res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
});


userDetailsRoutes.get('/user-details' , async (req , res) => {
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
})


export default userDetailsRoutes;
