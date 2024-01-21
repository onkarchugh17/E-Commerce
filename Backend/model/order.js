import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  totalAmount: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  selectedAddress: { type: Object },
  status: { type: String, default: "pending" },
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
  items: { type: Schema.Types.Mixed, required: true },
});

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Order = mongoose.model("Order", orderSchema);
