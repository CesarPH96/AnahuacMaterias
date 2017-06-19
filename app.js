var express       = require("express"),
    mongoose      = require("mongoose"),
    bodyParser    = require("body-parser"),
    app           = express();

//configuración base de datos
mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;

//configuración global
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//configuracion de rutas
app.use("/", indexRoutes);







app.listen(app.get('port'), function(){
  console.log("Starting Server on port "+ app.get('port'));
});
