import mongoose from "mongoose";


const postsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    profile: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    url: { type: String, default: null },
    caption: { type: String, default: null },
    comments: [
        {
            profile: { type: String },
            username: { type: String },
            comment: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    type: { type: String, enum: ['image', 'video'], default: null },
}, {
    timestamps: true,
});

const postsModel = mongoose.models.postsModel || mongoose.model('postsModel', postsSchema);
export default postsModel;