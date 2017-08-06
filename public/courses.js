var form = document.querySelector("#metricForm"),
    table = document.querySelector(".table"),
    metrics = document.querySelectorAll(".metric");
    last = metrics.length;

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
      row = table.insertRow(++last),
      name = row.insertCell(0),
      porcentage = row.insertCell(1),
      grade = row.insertCell(2);

  row.classList.add("metric");
  name.innerHTML = '<input type="text" name="metrics[name]" value=' + (nameMetric.value || 'Exámen&nbsp;1')  + '>';
  porcentage.innerHTML = '<input type="Number" name="metrics[porcentage]" value=10>';
  grade.innerHTML = '<input type="Number" name="metrics[grade]" value="8" step="0.1">';
}

function deleteLastMetric(){
  if (last > 1) {
    table.deleteRow(last--);
  }
}

var finalGrade = document.querySelectorAll(".final-grade-grade");

calculateGrade();
function calculateGrade(){
  finalGrade.forEach(function(grade){
    let fgrade = 0;
    let childTable = grade.offsetParent.childNodes[3].childNodes;
    for(let i = 1; i<childTable.length-2; i+=2){
      fgrade += Number(childTable[i].childNodes[3].firstChild.value) * (Number(childTable[i].childNodes[5].firstChild.value)/100);
      console.log("i: "+fgrade);
    }
    grade.innerText = parseFloat(fgrade).toFixed(2);
    console.log(fgrade);
  });

}
