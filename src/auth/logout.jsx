// import * as storage from "../storage/index.js";

export default function logout() {
  localStorage.clear();
  location.href = "/";
}
