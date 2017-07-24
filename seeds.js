var mongoose = require("mongoose");
var Course = require("./models/course");

var dataCRS = [
  {
    name: "Sistemas Operativos",
    credits: 8,
    metrics:[ {
      name: "Examen 1",
      porcentage: "10",
      grade: parseInt(Math.random()*10+1)
    }]
  },
  {
    name: "Estructura de Datos",
    credits: 8,
    metrics:[ {
      name: "Examen 1",
      porcentage: "10",
      grade: parseInt(Math.random()*10+1)
    }]
  },
  {
    name: "Redes Avanzadas",
    credits: 8,
    metrics:[ {
      name: "Examen 1",
      porcentage: "10",
      grade: parseInt(Math.random()*10+1)
    }]
  },
  {
    name: "Estadistica Inferencial",
    credits: 8,
    metrics:[ {
      name: "Examen 1",
      porcentage: "10",
      grade: parseInt(Math.random()*10+1)
    }]

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
          }
        });
    });
  });
  // Course.remove({}, function(err){});
}


module.exports = seedDB;
