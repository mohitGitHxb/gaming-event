// Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Retrieve the MongoDB connection string from the environment variables.
// This URI is essential for connecting to the MongoDB database.
const MONGODB_URI = process.env.MONGODB_URI;

// Define a cached object to store the MongoDB connection (`conn`) and the promise associated with initiating the connection (`promise`).
// This caching mechanism is used to reuse the connection in subsequent calls, improving performance.
// The `global` object is used to store the cache, making it persistent across invocations in environments like serverless functions.
let cached = (global as any).mongoose || { conn: null, promise: null };

// Define an asynchronous function to manage the connection to the MongoDB database.
export const connectToDatabase = async () => {
  // If a connection already exists in the cache, return it immediately to reuse the existing connection.
  if (cached.conn) return cached.conn;

  // If the MONGODB_URI is not set, throw an error as it is essential for connecting to MongoDB.
  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  // If there is no ongoing connection attempt (cached.promise is null), initiate a new connection to MongoDB.
  // The connection options include specifying the database name (`dbName`) and disabling command buffering (`bufferCommands`).
  // This ensures that commands are not buffered if the connection is not yet established, which is important for performance.
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "GamingX", // Specify the database name to connect to.
      bufferCommands: false, // Disable Mongoose's buffering mechanism.
    });

  // Await the resolution of the connection promise. This effectively waits for the connection to MongoDB to be established.
  // Once the promise resolves, the connection object is stored in `cached.conn` for reuse in subsequent calls.
  cached.conn = await cached.promise;

  // Return the established MongoDB connection, making it available for use in the application.
  return cached.conn;
};
