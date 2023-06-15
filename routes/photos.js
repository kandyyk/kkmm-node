const express = require("express");
const router = express.Router();
var uploadFile = require("./uploadfile");
const albumModel = require("../mongoose/models/AlbumModel");
const photoModel = require("../mongoose/models/PhotoModel");

router.post("/createAlbum", (req, res) => {
  let album = new albumModel({
    name: req.body.name,
    uploadTime: new Date(),
    public: req.body.public,
    avatar: req.body.avatar || "",
  });

  album.save((err, result) => {
    if (err) {
      console.log(err);
      res.json({
        code: "0001",
        msg: "创建相册失败",
      });
    } else {
      res.json({
        code: "0000",
        msg: "创建相册成功",
        data() {
          return {
            albumId: result._id,
            ...album,
          };
        },
      });
    }
  });
});

router.post("/uploadPhoto", uploadFile, (req, res) => {
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
