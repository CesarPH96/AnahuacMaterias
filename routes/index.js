var express       = require("express"),
    router        = express.Router(),
    Course        = require("../models/course"),
    User          = require("../models/user"),
    passport      = require("passport");
//configuracion de la pagina principal
router.get("/", isLoggedIn, function(req, res){
  res.redirect("/courses");
});

// router.get("/courses", function(req, res){
//   Course.find({},function(err, foundCourse){
//         res.render("home", {courses: foundCourse});
//   });
// });

router.get("/courses", isLoggedIn, function(req, res){
  User.findById(req.user._id).populate("courses").exec(function(err, foundUser){
    res.render("home", {user: foundUser});
  });
});

router.get("/courses/new", isLoggedIn, function(req, res){
  res.render("courses/new");
});

router.post("/courses", isLoggedIn, function(req, res){
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

  User.findById(req.user._id, function(err, foundUser){
      Course.create(newCourse, function(err, course){
        if(err){
          console.log(err);
        }else{
          foundUser.courses.push(course);
          foundUser.save();
          res.redirect("/courses");
        }
      });
  });
});

router.get("/:courseId/edit", isLoggedIn, function(req, res){
    Course.findById(req.params.courseId, function(err, foundCourse){
        res.render("courses/edit", {course: foundCourse});
    });
});

router.put("/:courseId",isLoggedIn, function(req,res){
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

router.put("/:courseId/g", isLoggedIn, function(req,res){
  let newMetrics = [];
  let fGrade = 0;
  let tporc = 0;
  console.log( req.body);
  for(let i=0; i < req.body.metrics.grade.length; i++){
    newMetrics.push({
      name:req.body.metrics.name[i],
      porcentage: req.body.metrics.porcentage[i],
      grade: req.body.metrics.grade[i]
    });
    fGrade +=  Number(req.body.metrics.grade[i]) * Number((req.body.metrics.porcentage[i]));
    tporc += Number(req.body.metrics.porcentage[i]);
  }
  fGrade /= tporc;
  console.log( "H: " + newMetrics);
  let newCourse = {
    metrics: newMetrics,
    finalGrade: fGrade.toFixed(2)
  };
    console.log( "I: " + req.params.courseId);
    Course.findByIdAndUpdate(req.params.courseId, newCourse ,function(err, updatedCourse){
    console.log( "U: " + updatedCourse);
    res.render("close");
  });
});

router.delete("/:courseId", isLoggedIn, function(req, res){
  Course.findByIdAndRemove(req.params.courseId, function(err){
      res.redirect("/courses");
  });
});

router.get("/login", function(req, res){
  res.render("login");
});

router.get("/signup", function(req, res){
  res.render("register");
});

router.post("/signup", function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/");
    });
  });
});

router.post("/login",passport.authenticate("local",//middleware
{
  successRedirect:"/courses",
  failureRedirect:"/login"
}), function(req, res){

});

router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

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
