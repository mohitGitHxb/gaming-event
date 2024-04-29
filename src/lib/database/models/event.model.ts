import { Document, model, models, Schema } from "mongoose";

// Define a TypeScript interface for the Event model
interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt?: Date;
  imageUrl: string;
  startDateTime?: Date;
  endDateTime?: Date;
  price?: string;
  isFree?: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

// Define the Event schema with custom error messages for required fields
const EventSchema = new Schema<IEvent>({
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: [true, "Image URL is required"] },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Organizer is required"],
  },
});

// Create the model or use the existing one
const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
