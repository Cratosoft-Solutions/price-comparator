import mongoose from "mongoose";
let isConnected = false;
export const connectToDB  = async() =>{
  mongoose.set('strictQuery', true);
  
  if(isConnected){
    console.log('Mongo DB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "cratosoft",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    isConnected= true;
    console.log("Mongo DB Connected");

  } catch (error) {
    //TODO Verify log management
  }
}