import mongoose, { Document, Schema } from "mongoose";

export type EventType = "conference" | "workshop" | "meetup" | "party";

export interface IEvent extends Document {
  name: string;
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;
  type: EventType;
  reminder: boolean;
  organizer: string;
  capacity: number;
  registeredAttendees: number;
}

const EventSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ["conference", "workshop", "meetup", "party"],
      required: true,
    },
    reminder: { type: Boolean, default: false },
    organizer: { type: String, required: true },
    capacity: { type: Number, required: true },
    registeredAttendees: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEvent>("Event", EventSchema);
