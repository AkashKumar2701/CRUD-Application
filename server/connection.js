import mongoose from 'mongoose';
import PostMessage from './models/postMessage.js';

const uri = "mongodb+srv://akash_kumar:WBJ3MTPaz8oRfG7S@cluster0.sf0mf.mongodb.net/memoriesDB?retryWrites=true&w=majority";

export const run = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connection.readyState === 1) {
      console.log("Connected to MongoDB!");      
      const total = await PostMessage.countDocuments({});
    } else {
      console.error("Failed to connect to MongoDB.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};