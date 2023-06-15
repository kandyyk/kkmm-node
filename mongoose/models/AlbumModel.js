const mongoose = require("mongoose");
var Schema = mongoose.Schema;

//创建Schema对象（约束）
var albumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now(),
  },
  public: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    default: "",
  }, //相册封面url
});

module.exports = mongoose.model("album", albumSchema);
