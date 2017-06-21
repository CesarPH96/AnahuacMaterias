var mongoose =  require("mongoose");
var courseSchema = new mongoose.Schema({
  name: String,
  metric: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Metric"
    }
  ]
});

module.exports = mongoose.model("Course", courseSchema);
