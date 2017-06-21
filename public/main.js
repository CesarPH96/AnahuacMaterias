var semesters = document.querySelectorAll(".semester");
var courses = document.querySelectorAll(".courses");
    // materias =  document.querySelectorAll(".materia");


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
