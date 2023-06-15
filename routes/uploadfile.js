//uploadFile.js
const multer = require("multer");
const path = require("path");

module.exports = (req, res, next) => {
  let fullPath = path.resolve()+"/attachment";
  let filename = "";
  let storage = multer.diskStorage({
    //设置文件存储路径
    destination: (req, file, cb) => {
      cb(null, fullPath);
    },
    //设置文件存储名称
    filename: (req, file, cb) => {
      let extname = path.extname(file.originalname);
      filename = file.fieldname + "-" + Date.now() + extname;
      cb(null, filename);
    },
  });

  let limits = {
      files:9, //最多上传9个文件
      fileSize:1024*1024*10 //设置单个文件最大为 10M
  }
  //上传单张图片
  let upload = multer({ storage ,limits }).array("photo",9);
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.json({  
        code: '1010',
        msg: '上传失败' + JSON.stringify(err),
        data: {}
      });
    } else if (err) {
      res.json({  
        code: '1011',
        msg: '上传失败' + JSON.stringify(err),
        data: {}
      });
    } else {
      //上传成功后，将图片写在req.body.photo中，继续住下执行
      req.body.photo = filename;
      next();
    }
  });
};
