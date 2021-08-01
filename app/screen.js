import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

const monthText = document.getElementById("month-text");
const dayText = document.getElementById("day-text");
const dayOfWeekText = document.getElementById("day-of-week-text");

const hourText = document.getElementById("hour-text");
const minuteText = document.getElementById("minute-text");
const secondText = document.getElementById("second-text");

const hourBackText = document.getElementById("hour-back-text");
const minuteBackText = document.getElementById("minute-back-text");

const hoursHand = document.getElementById("hours-hand");
const minutesHand = document.getElementById("minutes-hand");
const secondsHand = document.getElementById("seconds-hand");

const hoursBackHand = document.getElementById("hours-back-hand");
const minutesBackHand = document.getElementById("minutes-back-hand");

const stepsValue = document.getElementById("steps-value");
const stepsUnit = document.getElementById("steps-unit");

const batteryValue = document.getElementById("battery-value");
const batteryCharging = document.getElementById("battery-charging");

const heartRateValue = document.getElementById("heart-rate-value");

const heartReteSection = document.getElementById("heart-rete-section");
const stepsSection = document.getElementById("steps-section");
const digitalClockSection = document.getElementById("digital-clock-section");
const digitalClockBackSection = document.getElementById("digital-clock-back-section");
const analogClockSection = document.getElementById("analog-clock-section");
const analogClockBackSection = document.getElementById("analog-clock-back-section");

export function updateDateAndTime(today) {
  updateDate(today);
  updateDigitalTime(today);
  updateAnalogTime(today);
}

function updateDate(today) {
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let dayOfWeek = "日月火水木金土".charAt(today.getDay());
  monthText.text = month;
  dayText.text = day;
  dayOfWeekText.text = dayOfWeek;
}

function updateDigitalTime(today) {
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12;
  }
  hours = util.fillZero(hours);
  let minutes = util.fillZero(today.getMinutes());
  let seconds = util.fillZero(today.getSeconds());
  hourText.text = hours;
  hourBackText.text = hours;
  minuteText.text = minutes;
  minuteBackText.text = minutes;
  secondText.text = seconds;
}

function updateAnalogTime(today) {
  let minutes = today.getMinutes();
  hoursHand.groupTransform.rotate.angle = util.hoursToAngle(today.getHours() % 12, minutes);
  hoursBackHand.groupTransform.rotate.angle = util.hoursToAngle(today.getHours() % 12, minutes);
  minutesHand.groupTransform.rotate.angle = util.minutesToAngle(minutes);
  minutesBackHand.groupTransform.rotate.angle = util.minutesToAngle(minutes);
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
  setVisibility(heartReteSection, displayOn);
  setVisibility(stepsSection, displayOn);
  setVisibility(secondsHand, displayOn);
  setVisibility(digitalClockSection, displayOn);
  setVisibility(digitalClockBackSection, !displayOn);
  setVisibility(analogClockSection, displayOn);
  setVisibility(analogClockBackSection, !displayOn);
}

function setVisibility(elem, visible) {
  elem.style.visibility = (visible) ? "visible" : "hidden";
}

updateScreen(true);