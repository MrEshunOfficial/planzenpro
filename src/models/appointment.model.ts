import mongoose, { Document, Schema } from "mongoose";

export interface IAppointment extends Document {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  description: string;
  attendees: string;
  reminder: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

const AppointmentSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    startDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endDate: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    attendees: { type: String },
    reminder: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);
