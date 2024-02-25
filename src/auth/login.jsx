import { BASE_URL } from "../constants/api";
import { LOGIN_URL } from "../constants/api";
import * as storage from "../storage/index.js";

export async function onLogin(data) {
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
    storage.save("username", user.name);

    console.log(user);
    location.href = "/";
    return;
  } else {
    alert("You email is not registred or the password is wrong");
  }
}
