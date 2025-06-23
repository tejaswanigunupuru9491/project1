import mongoose from "mongoose";

const connectDB =async() =>
{
    try{
        mongoose.connection.on('connected',()=> console.log('Databaseconnected'));
        await mongoose.connect(`${process.env.MONGODB_URI}/Project 0`)
    }
    catch(error){
        console.log(error.message);
    }
}
export default connectDB;