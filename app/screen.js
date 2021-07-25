import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

const dateText = document.getElementById("date-text");
const timeText = document.getElementById("time-text");
const hoursHand = document.getElementById("hours-hand");
const minutesHand = document.getElementById("minutes-hand");
const secondsHand = document.getElementById("seconds-hand");

const stepsValue = document.getElementById("steps-value");
const stepsUnit = document.getElementById("steps-unit");
const batteryValue = document.getElementById("battery-value");
const batteryCharging = document.getElementById("battery-charging");
const heartRateValue = document.getElementById("heart-rate-value");

export function updateDateAndTime(today) {
  updateDate(today);
  updateDigitalTime(today);
  updateAnalogTime(today);
}

function updateDate(today) {
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = "日月火水木金土".charAt(today.getDay());
  dateText.text = month + "/" + date + "(" + day + ")";
}

function updateDigitalTime(today) {
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12;
  }
  hours = util.fillZero(hours);
  let minutes = util.fillZero(today.getMinutes());
  let seconds = util.fillZero(today.getSeconds());
  timeText.text = hours + ":" + minutes + ":" + seconds;
}

function updateAnalogTime(today) {
  let minutes = today.getMinutes();
  hoursHand.groupTransform.rotate.angle = util.hoursToAngle(today.getHours() % 12, minutes);
  minutesHand.groupTransform.rotate.angle = util.minutesToAngle(minutes);
  secondsHand.groupTransform.rotate.angle = util.secondsToAngle(today.getSeconds());
}

export function updateHeartRate(heartRate) {
  heartRateValue.text = heartRate;
}

export function updateSteps(steps) {
  stepsValue.text = steps.toLocaleString();
  stepsUnit.text = (steps > 1) ? "Steps" : Step;
}

export function updateBattery(battery, charging) {
  console.log("updateBattery() value=" + battery + ", charging=" + charging)
  batteryValue.text = battery + "%";
  batteryValue.style.fill = charging ? "lime" : "white";
  batteryCharging.style.fill = charging ? "lime" : "#00000000";
}

export function updateScreen(displayOn) {
  
}