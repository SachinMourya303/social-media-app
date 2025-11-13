import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import { ConnectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userDetailsRoutes from './routes/userDetailsRoutes.js';
import postsRoutes from './routes/postsRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

const loadDB = async () => {
    await ConnectDB();
}
loadDB();

app.use('/auth' , authRoutes);
app.use('/users' , userDetailsRoutes);
app.use('/post' , postsRoutes);

app.listen(PORT , () => {
    console.log(`Server : http//:localhost:${PORT}`);
})