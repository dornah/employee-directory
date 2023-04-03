import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable.'
  )
}

const dbConnect = async() => {
    try {
        await mongoose.connect(MONGODB_URI);
      } catch (error) {
        throw error
      }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!");
});

export default dbConnect