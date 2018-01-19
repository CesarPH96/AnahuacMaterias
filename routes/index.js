const express       = require("express"),
      router        = express.Router(),
      Course        = require("../models/course"),
      User          = require("../models/user"),
      passport      = require("passport");

//configuracion de la pagina principal
router.get("/", isLoggedIn, (req, res) => res.redirect("/courses"));

// router.get("/courses<", function(req, res){
//   Course.find({},function(err, foundCourse){
//         res.render("home", {courses: foundCourse});
//   });
// });

router.get("/courses", isLoggedIn, (req, res) => {
  User.findById(req.user._id).populate("courses").exec((err, foundUser) => {
    res.render("home", {user: foundUser});
  });
});

router.get("/courses/new", isLoggedIn, (req, res) => 
    res.render("courses/new")
);

router.post("/courses", isLoggedIn, (req, res) => {
  let newMetrics = [];
  let fGrade = 0;
  let fPorc = 0;

  for (let i=0; i < req.body.metrics.name.length; i++) {
    newMetrics.push({
      name: req.body.metrics.name[i],
      porcentage: req.body.metrics.porcentage[i],
      grade: req.body.metrics.grade[i]
    });
    fPorc +=  Number((req.body.metrics.porcentage[i]));
    fGrade +=  Number(req.body.metrics.grade[i]) * Number((req.body.metrics.porcentage[i]));
  }
  fGrade /= fPorc;

  User.findById(req.user._id, (err, foundUser) => {
      const course =  new Course();

      course.name = req.body.course.title,
      course.credits = req.body.course.credits,
      course.metrics = newMetrics,
      course.finalGrade = fGrade.toFixed(2)

      course.save((err, course) => {
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

router.get("/:courseId/edit", isLoggedIn, (req, res) => {
    Course.findById(req.params.courseId, (err, foundCourse) => res.render("courses/edit", {course: foundCourse}));
});

router.put("/:courseId",isLoggedIn, (req,res) => {
  let newMetrics = [];
  let fGrade = 0;
  let fPorc = 0;

  for (let i=0; i < req.body.metrics.name.length; i++) {
    newMetrics.push({
      name: req.body.metrics.name[i],
      porcentage: req.body.metrics.porcentage[i],
      grade: req.body.metrics.grade[i]
    });
    fPorc +=  Number((req.body.metrics.porcentage[i]));
    fGrade +=  Number(req.body.metrics.grade[i]) * Number((req.body.metrics.porcentage[i]));
  }
  fGrade /= fPorc;

  const newCourse = {
    name: req.body.course.title,
    credits: req.body.course.credits,
    metrics: newMetrics,
    finalGrade: fGrade.toFixed(2)
  };

  Course.findByIdAndUpdate(req.params.courseId, newCourse , (err, updatedCourse) => res.redirect("/courses"));
});

router.put("/:courseId/g", isLoggedIn, function(req,res){
  let newMetrics = [];
  let fGrade = 0;
  let tporc = 0;

  for (let i=0; i < req.body.metrics.grade.length; i++) {
    newMetrics.push({
      name:req.body.metrics.name[i],
      porcentage: req.body.metrics.porcentage[i],
      grade: req.body.metrics.grade[i]
    });
    fGrade +=  Number(req.body.metrics.grade[i]) * Number((req.body.metrics.porcentage[i]));
    tporc += Number(req.body.metrics.porcentage[i]);
  }
  fGrade /= tporc;

  const newCourse = {
    metrics: newMetrics,
    finalGrade: fGrade.toFixed(2)
  };

  Course.findByIdAndUpdate(req.params.courseId, newCourse, (err, updatedCourse) => {
    res.render("close");
  });
});

router.delete("/:courseId", isLoggedIn, function(req, res){
  Course.findByIdAndRemove(req.params.courseId, (err) => res.redirect("/courses"));
});

router.get("/login", (req, res) => res.render("login"));

router.get("/signup", (req, res) => res.render("register"));

router.post("/signup", (req, res) => {
  const newUser = new User({username: req.body.username});

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

router.post("/login",passport.authenticate("local",{//middleware
  successRedirect:"/courses",
  failureRedirect:"/login"
}), (req, res) => {});

router.get("/logout", (req, res) => {
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
