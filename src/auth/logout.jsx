import * as storage from "../storage/index.js";

export function logout() {
  localStorage.clear();
  location.href = "/";
}
