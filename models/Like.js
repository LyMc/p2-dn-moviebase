import mongoose from "mongoose";

global.models = global.models || {};

global.models.Like =
  global.models.Like ||
  mongoose.model("Like", {
    id: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  });

export default global.models.Like;
