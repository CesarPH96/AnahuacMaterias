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
