var express       = require("express"),
    router        = express.Router(),
    Semester      = require("../models/semester");
    Course      = require("../models/course");
    Metric      = require("../models/metric");

//configuracion de la pagina principal
router.get("/", function(req, res){
  Semester.find({}, function(err, foundSemester){
    console.log(foundSemester);
    Course.find({}, function(err, foundCourse){
      console.log(foundCourse);
      Metric.find({}, function(err, foundMetric){
      res.render("home", {semesters: foundSemester, courses: foundCourse, metrics: foundMetric});
      });
    });
  });
});

module.exports = router;
