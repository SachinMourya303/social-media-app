import mongoose from "mongoose";


const userDetailsSchema = new mongoose.Schema({
    profile: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
})

const userDetailsModel = mongoose.models.userDetailsModel || mongoose.model('userDetailsModel', userDetailsSchema);
export default userDetailsModel; 