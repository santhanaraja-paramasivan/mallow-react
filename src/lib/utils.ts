/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const getLocalStorage = (key: string) => {
  return sessionStorage.getItem(key);
};
export const removeLocalStorage = (key: string) => {
  return sessionStorage.removeItem(key);
};

export const setLocalStorage = (key: string, payload: any) => {
  sessionStorage.setItem(
    key,
    typeof payload === "object" ? JSON.stringify(payload) : payload
  );
};

export const setLocalStorageObject = (obj: any) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const payload = obj[key];
      sessionStorage.setItem(
        key,
        typeof payload === "object" ? JSON.stringify(payload) : payload
      );
    }
  }
};

export const text = (value: any) => {
  if (
    value == undefined ||
    value == "undefined" ||
    value == null ||
    value == "null" ||
    value == ""
  ) {
    return "-";
  }
  return value;
};

export const keyValuePairChange = (data: any) => {
  const keyArray: any = [];
  Object.keys(data).filter((info: any) => {
    if (!Array.isArray(data[info])) {
      const obj = {
        key: info,
        value: data[info],
      };
      keyArray.push(obj);
    }
  });
  return keyArray;
};

export const alertError = (error: any) => {
  message.error(
    !error
      ? "Something went wrong"
      : error.message
        ? error.message
        : error.data?.message || "Something went wrong"
  );
};
export const getCurrentDate = () => {
  return moment(new Date()).format("L");
};

export const count = (givenArray: any) => {
  let value: string = "0";
  if (Array.isArray(givenArray)) {
    value =
      givenArray.length < 10
        ? "0" + givenArray.length
        : givenArray.length.toString();
  }
  return value;
};


export const findOptionDescription = (value: string | number, options: any[]) => {
  if (options.length > 0) {
    const findOptionsIndex = options.findIndex((val) => {
      return val.value == value;
    });
    if (findOptionsIndex >= 0) {
      return options[findOptionsIndex].label || options[findOptionsIndex].name
    }
  }
  return null;
}