import mongoose from "mongoose";
import path from "path";
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [1, "Price should be at least 1"],
    max: [200000, "Price should be less than 200000"],
  },
  discountPercentage: {
    type: Number,
    min: [1, "Discount should be at least 1%"],
    max: [99, "Discount can't be more than 99"],
    default: 0,
  },
  rating: {
    type: Number,
    min: [0, "Rating should be at least 1"],
    max: [5, "Rating can't be more than 5"],
    default: 0,
  },
  stock: {
    type: Number,
    min: [0, "Stock can't be less than 0"],
    default: 0,
    required: true,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
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

export const Product = mongoose.model("Product", productSchema);
