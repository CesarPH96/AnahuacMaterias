var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    app             = express(),
    seedDB          = require("./seeds"),
    methodOverride  = require("method-override"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user");
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
app.use(methodOverride("_method"));
// seedDB
// configuracion de Passport
app.use(require("express-session")({
  secret: "Este es un codigo secreto",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//conexion con las rutas
app.use('/', indexRoutes);

app.listen(app.get('port'), function(){
  console.log("Starting Server on port "+ app.get('port'));
});
