"use strict";

var employees = [];
var avgSalary = 0;
var empLimit = 10;
var salLimit = 2000;
var wrongInput = 'You entered wrong credentials';
var wrongLimit = 'You entered wrong limit value!';
var salExeed = 'Salary sum is exceeded. <br>Please contact CEO for approvement!';
var empExeed = 'You reached employees limit, no more employer can be added!';
var empCopy = 'This employee is in the list already!';

document.getElementById('employeesLimit').onclick = setLimit;
document.getElementById('newEmployeeBtn').onclick = addEmp;


//===============================================
function setLimit(){
  event.preventDefault();
  var tempInput = parseInt(document.getElementById('employeesLimitInput').value);

  if (tempInput) {
    empLimit = tempInput;
    document.getElementById('emp_lim').innerHTML = empLimit;
    return empLimit;

  } else {
    return showAlertMessage(wrongLimit);
  }
}

//================================================
function addEmp(){
  event.preventDefault();
  if (ifBelowEmpLimit() ) {
    getNewEmp();
    document.getElementById('is_hired').innerHTML = employees.length;
  } else {
    return showAlertMessage(empExeed);
  }
}

//================================================
function ifBelowEmpLimit(){
  event.preventDefault();
  if (employees.length < empLimit) {
    return true;
  } else {
    return false;
  }
  // var tmp = (employees.length < 10) ? true : false; ???????????does not work!!!!
}
//================================================
function getNewEmp(){
  event.preventDefault();

  var employer = {
    firstName : document.getElementById("firstName").value,
    lastName : document.getElementById('lastName').value,
    salary : parseInt(document.getElementById('salary').value),
    position  : document.getElementById('position').value
  };

  for (var key in employer){
    if (!employer[key]){
      return showAlertMessage(wrongInput);
    }
  }

  if (ifBelowSalLimit(employer.salary)) {
    if (ifDublicate(employer.firstName, employer.lastName, employees)) {
      return showAlertMessage(empCopy);
    }
    employees.push(employer);
    avgSal();
    document.getElementById('avg_sal').innerHTML = avgSalary;
    addToList(employer);
    return;
  } else {
    return showAlertMessage(salExeed);
  }
}

//========================================
function avgSal(){
  var sum = 0;

  for (var i = 0; i < employees.length; i++) {
    sum += employees[i].salary;
  }

  avgSalary = (sum / employees.length) - ((sum / employees.length) % 1);
  return sum;
}

//========================================
function ifBelowSalLimit(newSalary){
  var tempAvgSalary = (avgSal() + newSalary) / (employees.length + 1);

  if (tempAvgSalary < salLimit) {
    return true;
  } else {
    return false;
  }
  //var result = (tempAvgSalary < salLimit) ? true : false; !!!!!!!!!!!!!??????????
}

//=========================================
function ifDublicate(name, surname, arr){
  for (var i=0; i < arr.length; i++) {
    var toCheckName = arr[i].firstName;
    var toCheckSurname = arr[i].lastName;
    if (toCheckName === name && toCheckSurname === surname) {
        return true;
    }
  }
}

//=========================================
function showAlertMessage(showCont){
  var alert = document.getElementById('message');
  alert.innerHTML = showCont;
  alert.style.visibility = 'visible';

  setTimeout(function(){
    alert.style.visibility = 'hidden';},
    3000);
}

//=========================================
function addToList(obj){
  var ol = document.getElementById('employeeList');
  var li = document.createElement("li");
  var text = document.createTextNode("First name: "+ obj.firstName+", Last name: "+obj.lastName+", salary: "+obj.salary+"$, position: "+obj.position);

  li.appendChild(text);
  ol.appendChild(li);
  return;
}
