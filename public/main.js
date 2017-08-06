// var semesters = document.querySelectorAll("li.semester");
// var courses = document.querySelectorAll("li.courses");
//
//
// semesters.forEach(function(semester){
//   collapse(semester);
// });
// courses.forEach(function(course){
//   collapse(course);
// });
//
// function collapse(element){
//   element.addEventListener("click", function(event){
//     event.target.nextElementSibling.classList.toggle("collapse");
//   });
// }



var finalGrade = document.querySelectorAll(".final-grade-grade"),
    metricGrade = document.querySelectorAll(".metric-grade"),
    updateCourse = document.querySelectorAll(".updateCourse");


calculateGrade();
function calculateGrade(){
  finalGrade.forEach(function(grade){
    let fgrade = 0;
    let childTable = grade.offsetParent.childNodes[3].childNodes;
    for(let i = 3; i<childTable.length-2; i+=2){
      fgrade += Number(childTable[i].childNodes[3].firstChild.value) * (Number(childTable[i].childNodes[5].firstChild.value)/100);
      console.log("i: "+fgrade);
    }
    grade.innerText = parseFloat(fgrade).toFixed(2);
    console.log(fgrade);
  });

}

metricGrade.forEach(function(grade){
  grade = grade.firstChild;
  grade.addEventListener("change", function(event){
    calculateGrade();
    updateFinalGrade();
  });
});

var coursesFinalGrade = document.querySelector(".courses-final-grade-grade"),
coursesGrade =  document.querySelectorAll(".courses-grade"),
totalCredits = document.querySelector(".courses-total-credits");

calculateFinalGrade();
function calculateFinalGrade(){
    let fGrade = 0, tCredits = 0;
    let childTable = coursesFinalGrade.offsetParent.childNodes[3].childNodes;
    for(let i = 1; i<childTable.length-2; i+=2){
      fGrade += Number(childTable[i].childNodes[3].textContent) * (childTable[i].childNodes[5].textContent);
      tCredits += Number(childTable[i].childNodes[3].textContent);
    }
    fGrade /= tCredits;
    totalCredits.innerText = tCredits;
    coursesFinalGrade.innerText = parseFloat(fGrade).toFixed(2);
    console.log(fGrade);
}

function updateFinalGrade(){
  coursesGrade.forEach(function(cGrade,i){
    cGrade.textContent = finalGrade[i].textContent;
  });
  calculateFinalGrade();
}
