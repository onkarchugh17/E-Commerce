import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  addresses: { type: [Schema.Types.Mixed] },
  orders: { type: [Schema.Types.Mixed] },
  role: { type: String, default: "user" },
});

const virtual = userSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Users = mongoose.model("Users", userSchema);
