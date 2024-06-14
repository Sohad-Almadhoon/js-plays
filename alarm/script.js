const selectMenu = document.querySelectorAll("select"),
  currentTime = document.querySelector("h1"),
  buttonAlarm = document.querySelector("button"),
  content = document.querySelector(".content");
let alarmTime,
  isAlarmSet = false;
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  const option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  selectMenu[0].firstElementChild.insertAdjacentElement("afterend", option);
}
for (let i = 59; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  const option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  selectMenu[1].firstElementChild.insertAdjacentElement("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let time = i == 1 ? "AM" : "PM";
  const option = document.createElement("option");
  option.value = time;
  option.innerHTML = time;
  selectMenu[2].firstElementChild.insertAdjacentElement("afterend", option);
}

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    time = "AM";
  if (h >= 12) {
    h = h - 12;
    time = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  currentTime.innerText = `${h}: ${m}: ${s} ${time}`;
  if (alarmTime == `${h}: ${m} ${time}`) {
    console.log("Alarm ringing...");
  }
}, 1000);

const setAlarm = function () {
  if (isAlarmSet) {
    alarmTime = "";
    content.classList.remove("disable");
    buttonAlarm.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }
  let time = `${selectMenu[0].value}: ${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please set a valid alarm!");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  buttonAlarm.innerText = "Clear Alarm";
};
buttonAlarm.addEventListener("click", setAlarm);
