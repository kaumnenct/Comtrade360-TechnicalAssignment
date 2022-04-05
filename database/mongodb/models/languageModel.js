import mongoose from "mongoose";

const schema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  greeting: {
    type: String,
    required: true,
  },
});

const hwLanguage = mongoose.model("HWLanguage", schema);

export default hwLanguage;
