import mongoose, { Document, Schema } from "mongoose";

interface RoutineDocument extends Document {
  name: string;
  startTime: string;
  endTime: string;
  frequency: "daily" | "weekly" | "monthly";
  daysOfWeek: number[];
  description?: string;
  reminder: boolean;
  status: "active" | "inactive";
}

const routineSchema: Schema<RoutineDocument> = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  frequency: {
    type: String,
    required: true,
    enum: ["daily", "weekly", "monthly"],
  },
  daysOfWeek: [{ type: Number, required: true }],
  description: { type: String },
  reminder: { type: Boolean, required: true },
  status: { type: String, required: true, enum: ["active", "inactive"] },
});

const Routine = mongoose.model<RoutineDocument>("Routine", routineSchema);

export default Routine;
export type { RoutineDocument };
