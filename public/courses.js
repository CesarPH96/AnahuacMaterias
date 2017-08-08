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

var finalGrade = document.querySelectorAll(".final-grade-grade"),
    totalPorcentage = document.querySelector(".total-porcentage"),
    porcentageMetric = document.querySelectorAll(".metric-porcentage"),
    gradeMetric = document.querySelectorAll(".metric-grade"),
    courseForm = document.querySelector("#courseForm");

calculateGrade();
function calculateGrade(){
  finalGrade.forEach(function(grade){
    let fgrade = 0;
    let tporc = 0;
    let childTable = grade.offsetParent.childNodes[3].childNodes;
    for(let i = 1; i<childTable.length-2; i+=2){
      fgrade += Number(childTable[i].childNodes[3].firstChild.value) * (Number(childTable[i].childNodes[5].firstChild.value)/100);
      tporc += Number(childTable[i].childNodes[3].firstChild.value);
      console.log("i: " + fgrade);
      console.log("p: " + tporc);
    }
    grade.innerText = parseFloat(fgrade).toFixed(2);
    totalPorcentage.textContent = tporc;
    if(tporc > 100){
      totalPorcentage.style.color = "red";
    }else{
      totalPorcentage.style.color = "black";
    }
    console.log(fgrade);
  });

}

porcentageMetric.forEach(function(porcentage){
  porcentage.addEventListener("change", function(event){
    calculateGrade();
  });
});

gradeMetric.forEach(function(grade){
  grade.addEventListener("change", function(event){
    calculateGrade();
  });
});

window.addEventListener('keydown',function(e){
  if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
    if((e.target.nodeName=='INPUT'&&e.target.type=='number') || (e.target.nodeName=='INPUT'&&e.target.type=='text') ){
      e.preventDefault();return false;
    }
  }
},true);

 function checkPorcentage(){
   if(totalPorcentage.textContent == 100){
     return true;

   }else{
    document.querySelector("#alert-porcentage").classList.remove("disable");
     return false;
   }
 }
