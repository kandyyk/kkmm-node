var express = require("express");
var router = express.Router();
var uploadFile = require("./uploadfile");
const photoModel = require("../mongoose/models/PhotoModel");
const albumModel = require("../mongoose/models/AlbumModel");

router.post("/", uploadFile, (req, res) => {
  console.log(req.body);
  //将req.body里的数据存储到数据库中
  let albumId = req.body.albumId;
  if (!albumId) {
    res.json({
      code: "1020",
      msg: "相册id不能为空",
    });
    return;
  }
  albumModel.find({ _id: req.body.albumId }, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        code: "1021",
        msg: "相册id不存在",
      });
    } else {
      if (result.length === 0) {
        res.json({
          code: "1021",
          msg: "相册id不存在",
        });
      }
      photoModel
        .create({
          albumId: req.body.albumId,
          url: url,
          uploadTime: new Date(),
          name: req.body.name,
        })
        .then((result) => {
          console.log(result);
          res.json({
            code: "0000",
            msg: "图片上传成功",
          });
        });
    }
  });
});

module.exports = router;
