function addTask() {
  let taskName = document.getElementById("taskName");
  let taskDate = document.getElementById("taskDate");
  let taskTime = document.getElementById("taskTime");
  let myCounter = Number(localStorage.getItem("counter"));
 
  storageAdd(taskName.value, taskDate.value, taskTime.value, myCounter);
  physicalAdd(taskName.value, taskDate.value, taskTime.value, myCounter);
  resetForm(taskName, taskDate, taskTime);
}

function storageAdd(taskName, taskDate, taskTime, myCounter) {
  if (myCounter == null) {
    localStorage.setItem("counter", 0);
  } else {
    localStorage.setItem("counter", (myCounter += 1));
  }
  let task = {
    taskName: taskName,
    taskDate: taskDate,
    taskTime: taskTime,
  };
  localStorage.setItem(myCounter, JSON.stringify(task));
}

function physicalAdd(taskName, taskDate, taskTime, myCounter) {
  let result = document.getElementById("result");
  result.innerHTML += `
    <div id="${myCounter}" class="note">
        <div class="noteBody"> 
            <span class="delIcon"><span class="delIconImage	glyphicon glyphicon-remove" onclick="deleteTask(${myCounter})"/></span></span>
            <span class="textArea">${taskName}</span>
            <span class="dateArea">${normalDate(taskDate)}</span>
            <span class="timeArea">${taskTime}</span>
        </div>
    </div>
    `;
}

function loadTasks() {
  let myCounter = Number(localStorage.getItem("counter"));
  if (myCounter == null) {
    return;
  } 
  for (let index = 1; index <= myCounter; index+=1) {
    let task = JSON.parse(localStorage.getItem(index));
    if(task != null){
      physicalAdd(task.taskName,task.taskDate,task.taskTime,index);
    }
  }
}

function resetForm(taskName, taskDate, taskTime) {
  taskName.value = "";
  taskDate.value = "";
  taskTime.value = "";
}

function deleteTask(noteId) {
  localStorage.removeItem(noteId);
  document.getElementById(noteId).remove();
}

function normalDate(oldDate) {
  var changeDate = oldDate.split("-");
  return changeDate[2] + "/" + changeDate[1] + "/" + changeDate[0];
}
