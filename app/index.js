import clock from "clock";
import { battery } from "power";
import { today as activity } from "user-activity";
import * as screen from "./screen"
import * as sensor from "./sensor"

clock.granularity = "seconds";
clock.ontick = (evt) => {
  screen.updateDateAndTime(evt.date);
  screen.updateSteps(activity.local.steps);
}

battery.onchange = (charger, event) => {
  screen.updateBattery(Math.floor(battery.chargeLevel), battery.charging);
}

sensor.initialize();
sensor.onHeartRateChanged = (heartRate) => {
  console.log("heartRate=" + heartRate);
  screen.updateHeartRate(heartRate);
}
sensor.onDisplayStateChanged = (on) => {
  screen.updateScreen(on)
}