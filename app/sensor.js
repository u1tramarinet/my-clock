import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { me as appbit } from "appbit";

const hrsEnabled = Boolean(appbit.permissions.granted("access_heart_rate") && HeartRateSensor);
const brEnabled = Boolean(BodyPresenceSensor);
const aodEnabled = Boolean(display.aodAvailable && appbit.permissions.granted("access_aod"));

export let onHeartRateChanged, onDisplayStateChanged;

let hrs, body;

export function initialize() {
  console.log("hrsEnabled=" + hrsEnabled);
  console.log("brEnabled=" + brEnabled);
  console.log("aodEnabled=" + aodEnabled + ", aodAvailable=" + display.aodAvailable + ", access_aod=" + appbit.permissions.granted("access_aod"));
  if (hrsEnabled) {
    hrs = new HeartRateSensor();
    hrs.onreading = () => {
      console.log("HeartRateSensor.onreading() heartRate=" + hrs.heartRate);
      onHeartRateChanged(hrs.heartRate);
    }
    hrs.start();
  }
  if (brEnabled) {
    body = new BodyPresenceSensor();
    body.onreading = () => {
      console.log("BodyPresenceSensor.onreading() present=" + body.present);
      updateHrsActivated();
    }
    body.start();
  }
  if (aodEnabled) {
    display.aodAllowed = true;
  }
  display.onchange = () => {
    console.log("display.onchange() on=" + display.on);
    updateHrsActivated();
    onDisplayStateChanged(!display.aodActive && display.on);
    console.log("display.onchange() aod=" + display.aodActive);
  }
}

function updateHrsActivated() {
  console.log("updateHrsActivated()/IN");
  let activated = false;
  if (hrsEnabled) {
    activated = display.on;
    if (brEnabled) {
      activated ? body.start() : body.stop();
      if (activated) {
        activated = Boolean(body.present);
      }
    }
    activated ? hrs.start() : hrs.stop();
  }
  console.log("updateHrsActivated()/OUT activated=" + activated);
}