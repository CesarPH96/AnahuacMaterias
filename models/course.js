var mongoose =  require("mongoose");
var courseSchema = new mongoose.Schema({
  name: String,
  credits: String,
  metrics: [],
  finalGrade: Number
});

module.exports = mongoose.model("Courses", courseSchema);
