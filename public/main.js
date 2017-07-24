var semesters = document.querySelectorAll("li.semester");
var courses = document.querySelectorAll("li.courses");


semesters.forEach(function(semester){
  collapse(semester);
});
courses.forEach(function(course){
  collapse(course);
});

function collapse(element){
  element.addEventListener("click", function(event){
    event.target.nextElementSibling.classList.toggle("collapse");
  });
}

var form = document.querySelector("#metricForm"),
    table = document.querySelector(".table"),
    last = 6;

function createForm(){
  let containerCourse = document.querySelector(".container-course");
      courseName =  document.querySelector("#courseName");
      courseTitle =  document.querySelector("#courseTitle");
      courseCredit =  document.querySelector("#courseCredit");
      courseCre =  document.querySelector("#courseCre");
      containerCourse.classList.remove("collapse");
  courseTitle.value = courseName.value;
  courseCredit.value = courseCre.value;
}

function addMetric(){
  let nameMetric = document.querySelector("#nameMetric"),
      row = table.insertRow(last++),
      name = row.insertCell(0),
      porcentage = row.insertCell(1),
      grade = row.insertCell(2);

  row.classList.add("metric");
  name.innerHTML = '<input type="text" name="metrics[name]" value=' + (nameMetric.value || 'Examen 1')  + '>';
  porcentage.innerHTML = '<input type="Number" name="metrics[porcentage]" value=10>';
  grade.innerHTML = '<input type="Number" name="metrics[grade]" value="8" step="0.1">';
}

function deleteLastMetric(){
  if (last > 2) {
    table.deleteRow(--last);
  }
}
