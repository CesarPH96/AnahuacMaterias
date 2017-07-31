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

router.get("/courses/new", function(req, res){
  res.render("courses/new");
});

router.post("/courses", function(req, res){
  let newMetrics = [];
  let fGrade = 0;
  for(let i=0; i < req.body.metrics.name.length; i++){
    newMetrics.push({
      name: req.body.metrics.name[i],
      porcentage: req.body.metrics.porcentage[i],
      grade: req.body.metrics.grade[i]
    });
    fGrade +=  Number(req.body.metrics.grade[i]) * Number((req.body.metrics.porcentage[i]/100));
  }


  let newCourse = {
    name: req.body.course.title,
    credits: req.body.course.credits,
    metrics: newMetrics,
    finalGrade: fGrade.toFixed(2)
  };

  Course.create(newCourse, function(err, course){
    if(err){
      console.log(err);
    }else{
      res.redirect("/courses");
    }
  });
});

router.get("/:courseId/edit", function(req, res){
    Course.findById(req.params.courseId, function(err, foundCourse){
        res.render("courses/edit", {course: foundCourse});
    });
});

router.put("/:courseId", function(req,res){
  let newMetrics = [];
  let fGrade = 0;
  for(let i=0; i < req.body.metrics.name.length; i++){
    newMetrics.push({
      name: req.body.metrics.name[i],
      porcentage: req.body.metrics.porcentage[i],
      grade: req.body.metrics.grade[i]
    });
    fGrade +=  Number(req.body.metrics.grade[i]) * Number((req.body.metrics.porcentage[i]/100));

  }
  let newCourse = {
    name: req.body.course.title,
    credits: req.body.course.credits,
    metrics: newMetrics,
    finalGrade: fGrade.toFixed(2)
  };
  Course.findByIdAndUpdate(req.params.courseId, newCourse ,function(err, updatedCourse){
      res.redirect("/courses");
  });
});

router.put("/:courseId/g", function(req,res){
  let newMetrics = [];
  let fGrade = 0;
  console.log( req.body);
  for(let i=0; i < req.body.metrics.grade.length; i++){
    newMetrics.push({
      name:req.body.metrics.name[i],
      porcentage: req.body.metrics.porcentage[i],
      grade: req.body.metrics.grade[i]
    });
    fGrade +=  Number(req.body.metrics.grade[i]) * Number((req.body.metrics.porcentage[i]/100));

  }
  let newCourse = {
    metrics: newMetrics,
    finalGrade: fGrade.toFixed(2)
  };
  Course.findByIdAndUpdate(req.params.courseId, newCourse ,function(err, updatedCourse){
    res.redirect("/courses");
  });
});

router.delete("/:courseId", function(req, res){
  Course.findByIdAndRemove(req.params.courseId, function(err){
      res.redirect("/courses");
  });
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
