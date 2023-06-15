const mongoose = require("mongoose");
var Schema = mongoose.Schema;

//创建Schema对象（约束）
var photoSchema = new Schema({
  albumId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  public: Boolean,
});

var PhotoModle = mongoose.model("photo", photoSchema);
module.exports = PhotoModle;
