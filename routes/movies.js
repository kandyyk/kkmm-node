var express = require("express");
var router = express.Router();

let top250 = require("../data/movies.json");

/* GET movies page. */
router.get("/top250", function (req, res, next) {
  let page = req.query.page;
  let movies = [];
  if (page === undefined) {
    page = 1;
  } else {
    page = parseInt(page);
    if (page < 1) {
      page = 1;
    }
    if (page <= 25) {
      movies = top250.slice((page - 1) * 10, page * 10);
    }
  }
  res.json({
    code: "0000",
    msg: "success",
    data: {
      movies,
    },
  });
});

module.exports = router;
