var form = document.querySelector("#metricForm"),
    table = document.querySelector(".table"),
    metrics = document.querySelectorAll(".metric");
    last = metrics.length;

function createForm(){
  let containerCourse = document.querySelector(".container-course"),
      containerTop = document.querySelector(".container-top"),
      courseName =  document.querySelector("#courseName"),
      courseTitle =  document.querySelector("#courseTitle"),
      courseCredit =  document.querySelector("#courseCredit"),
      courseCre =  document.querySelector("#courseCre"),
      h4  = document.querySelector("h4");

  containerCourse.classList.remove("collapse");
  courseTitle.value = courseName.value || 'Cálculo Univariado';
  courseCredit.value = courseCre.value || 10;
  h4.textContent = courseName.value || 'Cálculo Univariado';
  containerTop.classList.add("collapse");
  calculateGrade();
}

function addMetric(){
  let nameMetric = document.querySelector("#nameMetric"),
      row = table.insertRow(++last),
      name = row.insertCell(0),
      porcentage = row.insertCell(1),
      grade = row.insertCell(2);
  row.classList.add("metric");
  row.children[1].classList.add("metric-porcentage");
  row.children[2].classList.add("metric-grade");
  row.children[1].addEventListener("change", function(event){
    calculateGrade();
  });
  row.children[2].addEventListener("change", function(event){
    calculateGrade();
  });
  name.innerHTML = '<input type="text" name="metrics[name]" value=' + (nameMetric.value || 'Exámen&nbsp;1')  + '>';
  porcentage.innerHTML = '<input type="Number" name="metrics[porcentage]" value=10>';
  grade.innerHTML = '<input type="Number" name="metrics[grade]" value="" step="0.1">';
  calculateGrade();
}

function deleteLastMetric(){
  if (last > 1) {
    table.deleteRow(last--);
    calculateGrade();
  }
}

var finalGrade = document.querySelectorAll(".final-grade-grade"),
    totalPorcentage = document.querySelector(".total-porcentage"),
    porcentageMetric = document.querySelectorAll(".metric-porcentage"),
    gradeMetric = document.querySelectorAll(".metric-grade"),
    courseForm = document.querySelector("#courseForm");



function calculateGrade(){
  finalGrade = document.querySelectorAll(".final-grade-grade");
  porcentageMetric = document.querySelectorAll(".metric-porcentage");
  finalGrade.forEach(function(grade){
    let fgrade = 0;
    let tporc = 0;
    var childTable = grade.offsetParent.children[1].children;
    console.log("c: " + childTable.length);
    for(let i = 0; i < childTable.length-1; i++){
      fgrade += Number(childTable[i].children[1].firstChild.value) * (Number(childTable[i].children[2].firstChild.value));

      tporc += Number(porcentageMetric[i].firstChild.value);
      console.log("i: " + fgrade);
      console.log("p: " + tporc);
    }
    fgrade /= tporc;
    grade.innerText = parseFloat(fgrade).toFixed(2);
    console.log("p: " + tporc);
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
   if(totalPorcentage.textContent <= 100){
     return true;

   }else{
    document.querySelector("#alert-porcentage").classList.remove("disable");
     return false;
   }
 }
calculateGrade();
