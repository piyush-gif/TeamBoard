const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  hashedToken: { type: String, required: true, unique: true },
  expiresAt: { type: Date, reqruied: true },
});

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
