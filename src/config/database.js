import mongoose from 'mongoose';
const dbpassword = process.env.DBPASSWORD;
export const connect = async () =>{
    await mongoose.connect(`mongodb+srv://jaisondz9360:${dbpassword}@cluster0.0j87end.mongodb.net/?retryWrites=true&w=majority`);
}