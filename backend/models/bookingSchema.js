const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookingDate: { type: Date, required: true },
    bookingTime: { type: String, required: true },
    price: { type: String, required: true },
    paymentStatus: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
