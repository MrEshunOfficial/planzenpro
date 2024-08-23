import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter a firstName"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please enter a lastName"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please enter a valid date of birth"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiration: Date,
  verifyToken: String,
  verifyTokenExpiration: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiration: Date,
  googleId: String,
  googleAccessToken: String,
  googleRefreshToken: String,
  googleProfile: Object,
  facebookId: String,
  facebookAccessToken: String,
  facebookRefreshToken: String,
  facebookProfile: Object,
});

// Add a pre-save hook to update the 'updatedAt' field
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
