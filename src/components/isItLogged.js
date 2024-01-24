import * as storage from "../storage/index.js";

export function isItLogged() {
  return storage.load("token") ? true : false;
}
