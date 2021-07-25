export function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

export function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

export function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

export function getDateText(date) {
  const month = date.getMonth() + 1
  const date = date.getDate();
  const day = '日月火水木金土'.charAt(date.getDay());
  return month + "/" + date + " (" + day + ")";
}

export function getTimeText(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return hours + ":" + minutes + ":" + seconds;
}

export function getHeartRateText(heartRate) {
  return `${heartRate}\nbpm`;
}

export function getBatteryText(battery, charging) {
  var charge = (charging ? '\n充電中' : "");
  return battery + "%" + charge;
}

export function getStepText(steps) {
  var unit = ((steps >= 2) ? "Steps" : "Step");
  return `${steps.toLocaleString()}\n${unit}`;
}

export function fillZero(val) {
  if (val < 10) {
    val = "0" + val;
  }
  return val;
}