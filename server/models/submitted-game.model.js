const mongoose = require("mongoose");

const SubmittedPhoneInfoSchema = new mongoose.Schema({
  phoneName: { type: String, required: true, trim: true },
  phoneRam: { type: Number, required: true },
  phoneRom: { type: String, required: true }
}, {noId : true});

const submittedGameInfoSchema = new mongoose.Schema({
  gameName: { type: String, required: true },
  gameFps: { type: [mongoose.Schema.Types.Mixed],
    validate: {
      validator: function(arr) {
        return (typeof arr[0] == "number" && typeof arr[1] == "string")
      },
      message: 'gameFps must be an array of [number, string] pairs.'
    }, default: [] },
  gameFrameRate: { type: [String], default: [] },
  gameGraphics: { type: [String], default: [] },
  gameBatteryDrain: { type: Number, required: true, min: 1, max: 50 },
  gameCompatibility: { type: Number, required: true, min: 1, max: 100 }
}, {noId : true});

const submittedGameSchema = new mongoose.Schema({
  phoneInfo: { type: SubmittedPhoneInfoSchema, required: true },
  gameInfo: { type: [submittedGameInfoSchema], default: [] },
  userInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }
});

const submittedGameModel = mongoose.model("SubmittedGame", submittedGameSchema);
module.exports = submittedGameModel;
