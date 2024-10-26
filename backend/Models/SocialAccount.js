const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocialAccountSchema = new Schema({
  provider: {
    type: String,
    enum: ["google", "facebook"],
    required: true,
  },
  provider_id: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
  },
});

module.exports = SocialAccountSchema;
