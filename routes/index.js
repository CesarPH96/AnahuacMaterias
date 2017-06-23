var express       = require("express"),
    router        = express.Router(),
    Semester      = require("../models/semester");
    Course      = require("../models/course");
    Metric      = require("../models/metric");

//configuracion de la pagina principal
router.get("/", function(req, res){
  Semester.find({}).populate("courses").exec(function(err, foundSemester){
      var populateMetric = {
        path: 'courses.metrics',
        model: 'Metric'
      };
      if (err) return console.log(err);
      Semester.populate(foundSemester, populateMetric, function (err, foundSemester) {
        res.render("home", {semesters: foundSemester});
      });
  });
});

router.get("/semester/:semester_id/courses/new", function(req, res){
  console.log(req.body.numSemester);
  res.render("courses/new");
});


module.exports = router;
