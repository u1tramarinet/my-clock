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

export function convertToDayOfWeek(day, language) {
  let dayStr = '日月火水木金土'.charAt(day);
  if (!isJapanese(language)) {
    dayStr = convertToDayOfWeekEnglish(dayStr);
  }
  return dayStr;
}

function convertToDayOfWeekEnglish(japanese) {
  switch(japanese) {
    case '日': return "Sun";
    case '月': return "Mon";
    case '火': return "Tue";
    case '水': return "Wed";
    case '木': return "Thu";
    case '金': return "Fri";
    default: return japanese;
  }
}

export function getBatteryUnit(language) {
  console.log("language=" + language);
  return (isJapanese(language)) ? "充電中" : "charging";
}

export function getStepUnit(steps, language) {
  if (isJapanese(language)) {
    return "歩";
  }
  return (steps >= 2) ? "Steps" : "Step";
}

function isJapanese(language) {
  return (language == "ja-jp");
}

const c0 = String.fromCharCode(0x10);
const c1 = String.fromCharCode(0x11);
const c2 = String.fromCharCode(0x12);
const c3 = String.fromCharCode(0x13);
const c4 = String.fromCharCode(0x14);
const c5 = String.fromCharCode(0x15);
const c6 = String.fromCharCode(0x16);
const c7 = String.fromCharCode(0x17);
const c8 = String.fromCharCode(0x18);
const c9 = String.fromCharCode(0x19);

export function fillZero(val) {
  if (val < 10) {
    val = "0" + val;
  }
  return val;
}

export function convertToMonoDigits(num, pad = true) {
  let monoDigits = '';
  if (typeof num === 'number') {
    num |= 0;
    if (pad && num < 10) {
      monoDigits = c0 + convertToMonoDigit(num);
    } else {
      while (num > 0) {
        monoDigits = convertToMonoDigit(num % 10) + monoDigits;
        num = (num / 10) | 0;
      }
    }
  } else {
    let text = num.toString();
    let textLen = text.length;
    for (let i = 0; i < textLen; i++) {
      monoDigits += convertToMonoDigit(text.charAt(i));
    }
  }
  return monoDigits;
}

function convertToMonoDigit(digit) {
  switch (digit) {
    case 0: return c0;
    case 1: return c1;
    case 2: return c2;
    case 3: return c3;
    case 4: return c4;
    case 5: return c5;
    case 6: return c6;
    case 7: return c7;
    case 8: return c8;
    case 9: return c9;
    case '0': return c0;
    case '1': return c1;
    case '2': return c2;
    case '3': return c3;
    case '4': return c4;
    case '5': return c5;
    case '6': return c6;
    case '7': return c7;
    case '8': return c8;
    case '9': return c9;
    default: return digit;
  }
}