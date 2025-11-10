import mongoose from "mongoose";

const userDetailsSchema = new mongoose.Schema({
    profile: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    password: { type: String, required: true },

    storyFile: {
        url: { type: String, default: null },
        caption: { type: String, default: null },
        type: { type: String, enum: ['image', 'video'], default: null },
        createdAt: { type: Date, default: Date.now },
    },

    followers: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "userDetailsModel" },
            email: String,
            connection: { type: Boolean, default: false },
        },
    ],
    following: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "userDetailsModel" },
            email: String,
            connection: { type: Boolean, default: false },
        },
    ],
}, {
    timestamps: true
});

const userDetailsModel = mongoose.models.userDetailsModel || mongoose.model('userDetailsModel', userDetailsSchema);
export default userDetailsModel;
