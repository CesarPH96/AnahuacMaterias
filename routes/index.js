var express       = require("express"),
    router        = express.Router();

//configuracion de la pagina principal
router.get("/", function(req, res){
  res.render("home");
});

module.exports = router;
