const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  bookmarkedContests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contest" }],
});

module.exports = mongoose.model("User", UserSchema);
