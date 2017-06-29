var mongoose =  require("mongoose");
var semesterSchema = new mongoose.Schema({
  name: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
});


module.exports = mongoose.model("Semester", semesterSchema);
