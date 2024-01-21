import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});

const virtual = productSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Product = mongoose.model("Address", productSchema);
