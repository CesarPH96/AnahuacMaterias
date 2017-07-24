var mongoose =  require("mongoose");
var courseSchema = new mongoose.Schema({
  name: String,
  credits: String,
  metrics: []
});

module.exports = mongoose.model("Course", courseSchema);
