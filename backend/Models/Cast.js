const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CastSchema = new Schema({
  actor: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

module.exports = CastSchema;
