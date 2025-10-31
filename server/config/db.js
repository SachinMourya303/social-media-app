import mongoose from "mongoose"


export const ConnectDB = async () => {
   try {
     await mongoose.connect(`${process.env.MONGODB_URI}/data-collection`);
    console.log('DB Connected');
   } catch (error) {
    console.log('Connection Error: ',error);
   }
}