import { getDomain } from "./cookieHelper";

export const deleteCookie = (cname) => {
  document.cookie = cname + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie?.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c?.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c?.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const getCalculatedTime = (timeSeconds, getSeconds) => {
  let Hr = 0;
  let Mins = 0;
  let Sec = 0;

  if (timeSeconds >= 60) {
    Mins = Math.floor(timeSeconds / 60);
  }
  if (Mins >= 60) {
    Hr = Math.floor(Mins / 60);
    Mins = Mins % 60;
  }
  if (getSeconds) {
    Sec = timeSeconds % 60;
  }
  return {
    Hr: String(Hr).padStart(2, "0"),
    Mins: String(Mins).padStart(2, "0"),
    Sec: String(Sec).padStart(2, "0"),
  };
};

export const hoursToSeconds = (hours) => {
  return Number(hours) * 60 * 60;
};

export const isThisTaskRunning = (task) => {
  return task?.workStatusType?.name === "In Progress";
};

export const getMonthDates = (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  return {
    start: startDate,
    end: endDate,
  };
};

export const getCurrentMonthStartAndEndDate = () => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const start = `${firstDay.getFullYear()}-${
    firstDay.getMonth() + 1
  }-${firstDay.getDate()}`;
  const end = `${lastDay.getFullYear()}-${
    lastDay.getMonth() + 1
  }-${lastDay.getDate()}`;

  return { start, end };
};

export const getHoursFromSeconds = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  return hours;
};

export const getMinutesFromSeconds = (totalSeconds) => {
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return minutes;
};

export const getFormattedTimeFromSeconds = (totalSeconds) => {
  const hours = getHoursFromSeconds(totalSeconds);
  const minutes = getMinutesFromSeconds(totalSeconds);
  const seconds = totalSeconds % 60;
  const formattedTime = hours + "h " + minutes + "m " + seconds + "s";
  return formattedTime;
};

export const noDataValue = (value) => {
  return value ? value : "-";
};
