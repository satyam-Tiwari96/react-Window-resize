const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    password: { type: String },
    mobile: { type: String },
    gender: { type: String },
    is_deleted: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = model("User", userSchema);
module.exports = { User };
