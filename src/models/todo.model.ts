import mongoose, { Document, Schema } from "mongoose";

export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "in progress" | "completed";

export interface ITodo extends Document {
  name: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  category: string;
  status: Status;
  reminder: string;
}

const TodoSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      required: true,
    },
    reminder: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
