import { BASE_URL } from "../constants/api";
import { LOGIN_URL } from "../constants/api";
import * as storage from "../storage/index.js";

export async function onLogin(data) {
  //   event.preventDefault();
  console.log(data);
  const response = await fetch(BASE_URL + LOGIN_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  console.log(response);

  if (response.ok) {
    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);
    storage.save("avatar", user.avatar);
    storage.save("manager", user.venueManager);

    console.log(user);
    location.href = "/";
    return;
  }
}
