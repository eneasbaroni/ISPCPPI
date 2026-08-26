import mongoose from "mongoose";

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME


const URL = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
export const connectMongoDB = async () => {   
  try {
    await mongoose.connect(URL)    
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};