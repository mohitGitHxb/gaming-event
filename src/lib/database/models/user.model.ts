import { Schema, model, models, Document } from "mongoose";

// 1. Define a TypeScript interface for the User model
interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  role: "user" | "admin";
}

// Define the User schema with custom error messages for required fields
const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: [true, "Clerk ID is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  photo: {
    type: String,
    required: [true, "Photo is required"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: [true, "Role is required"],
  },
});

// Create the model or use the existing one
const User = models.User || model<IUser>("User", UserSchema);

export default User;
