var mongoose =  require("mongoose");
var metricSchema = new mongoose.Schema({
  name: String,
  porcentage: Number,
  grade: Number
});

module.exports = mongoose.model("Metric", metricSchema);
