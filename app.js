var express       = require("express"),
    mongoose      = require("mongoose"),
    bodyParser    = require("body-parser"),
    app           = express();
    seedDB        = require("./seeds");
//configuración base de datos
mongoose.connect("mongodb://localhost/Anahuac_materias");
mongoose.Promise = global.Promise;

//configuración de las rutas
var indexRoutes = require("./routes/index");

//configuración global
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// seedDB
//coneccion con las rutas
app.use('/', indexRoutes);

app.listen(app.get('port'), function(){
  console.log("Starting Server on port "+ app.get('port'));
});
