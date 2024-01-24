import * as storage from "../storage/index.js";

export function isItLogged() {
  return storage.load("token") ? true : false;
}

export function isManager() {
  return storage.load("manager") ? true : false;
}
