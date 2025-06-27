import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    microsoftId: { type: String, required: true, unique: true },
    displayName: String,
    email: String,
    avatar: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
