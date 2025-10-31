import express from 'express';
import { signInValidation, signUpValidation } from '../middleware/authValidation.js';
import { signIn, signUp } from '../controller/authController.js';
import userModel from '../models/userModel.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signUpValidation, signUp);
authRoutes.post('/signin', signInValidation, signIn);
authRoutes.get('/allusers', async (req, res) => {
    try {
        const { email } = req.query;
        let users;

        if (email) {
            users = await userModel.findOne({ email });
            return res.json({ users });
        } else {
            users = await userModel.find({});
            return res.json({ Allusers: users });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})

export default authRoutes;