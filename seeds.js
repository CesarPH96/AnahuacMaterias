var mongoose = require("mongoose");
var Course = require("./models/course");
var Metric = require("./models/metric");

var dataCRS = [
  {
    name: "Sistemas Operativos"
  },
  {
    name: "Estructura de Datos"
  },
  {
    name: "Redes Avanzadas"
  },
  {
    name: "Estadistica Inferencial"
  }
];
var porc = [30, 40, 30];
function seedDB(){
  //remove all campgrounds
    //add a few campgrounds
    dataCRS.forEach(function(crs, i){
          Course.remove({}, function(err){
            Course.create(crs, function(err, course){
                            if(err){
                              console.log(err);
                            }else{
                              Metric.remove({}, function(err){
                                Metric.create({
                                                name: "Examen 1",
                                                porcentage: "10",
                                                grade: parseInt(Math.random()*10+1)
                                              }, function(err, met){
                                                if(err){
                                                  console.log(err);
                                                }else{
                                                  course.metrics.push(met);
                                                  course.save();
                                                  // console.log("course: "+ course);
                                                  // console.log("metric: "+met);
                                                  // console.log("Created a new metric");
                                                }

                                              });
                              });
                            }

            });

        });
      });
}


module.exports = seedDB;
