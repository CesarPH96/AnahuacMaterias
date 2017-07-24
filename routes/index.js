var express       = require("express"),
    router        = express.Router(),
    Course      = require("../models/course");

//configuracion de la pagina principal
router.get("/", function(req, res){
  res.redirect("/courses");
});

router.get("/courses", function(req, res){
  Course.find({},function(err, foundCourse){
        res.render("home", {courses: foundCourse});
  });
});

router.post("/courses", function(req, res){
  let newMetrics = [];
  for(let i=0; i < req.body.metrics.name.length; i++){
    newMetrics.push({
      name: req.body.metrics.name[i],
      porcentage: req.body.metrics.porcentage[i],
      grade: req.body.metrics.grade[i]
    });
  }
  let newCourse = {
    name: req.body.course.title,
    credits: req.body.course.credits,
    metrics: newMetrics
  };

  Course.create(newCourse, function(err, course){
    if(err){
      console.log(err);
    }else{
      res.redirect("/courses");
    }
  });
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
