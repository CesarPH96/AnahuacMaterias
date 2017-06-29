var mongoose = require("mongoose");
var Semester = require("./models/semester");
var Course = require("./models/course");
var Metric = require("./models/metric");

var courseData = [
  {
    name: "Sistemas Operativos"
  },
  {
    name: "Estructura de Datos"
  },
  {
    name: "Ecuaciones Diferenciales"
  },
  {
    name: "Probabilidad"
  },
];
var porc = [30, 40, 30, 20];
function seedDB(){
    Course.remove({}, function(err){
      Metric.remove({}, function(err){
        //add a few campgrounds
          courseData.forEach(function(crs, i){
            Course.create(crs, function(err, course){
                            if(err){
                              console.log(err);
                            }else{
                                console.log("Created a new course");
                                Metric.create({
                                                name: "Examen 1",
                                                porcentage: porc[i],
                                                grade: parseInt(Math.random()*10+1)
                                              }, function(err, met){
                                                if(err){
                                                  console.log(err);
                                                }else{
                                                  course.metrics.push(met);
                                                  course.save();
                                                  // console.log("course: "+ course);
                                                  // console.log("metric: "+met);
                                                  console.log("Created a new metric");
                                                }

                                              });
                                              // console.log(JSON.stringify(semester.courses, null, 4));

                          }
            });
          });
      });
    });
}

module.exports = seedDB;
