var express       = require("express"),
    router        = express.Router(),
    Semester      = require("../models/semester");
    Course      = require("../models/course");
    Metric      = require("../models/metric");

//configuracion de la pagina principal
router.get("/", function(req, res){
  res.redirect("/courses");
});
router.get("/courses", function(req, res){
  Course.find({}).populate("metrics").exec(function(err, foundCourse){
        res.render("home", {courses: foundCourse});
  });
});
router.post("/courses", function(req, res){
  console.log(req.body.metric);
});
router.get("/courses/new", function(req, res){
  res.render("courses/new");
});


module.exports = router;
// router.get("/", function(req, res){
//   Semester.find({}).populate("courses").exec(function(err, foundSemester){
//       var populateMetric = {
//         path: 'courses.metrics',
//         model: 'Metric'
//       };
//       if (err) return console.log(err);
//       Semester.populate(foundSemester, populateMetric, function (err, semester) {
//         res.render("home", {semesters: semester});
//       });
//   });
//
// });
