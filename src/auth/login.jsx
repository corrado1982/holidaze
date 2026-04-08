import { BASE_URL } from "../constants/api";
import { LOGIN_URL } from "../constants/api";
import * as storage from "../storage/index.js";

export async function onLogin(data) {
  const response = await fetch(BASE_URL + LOGIN_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json(); // Recuperiamo tutto l'oggetto

  if (response.ok) {
    // NELLA V2: i dati sono dentro json.data
    const { accessToken, ...user } = json.data;

    storage.save("token", accessToken);
    storage.save("profile", user);
    // Nota: user.avatar nella v2 è un oggetto { url, alt }
    storage.save("avatar", user.avatar?.url);
    storage.save("manager", user.venueManager);
    storage.save("username", user.name);

    location.href = "/";
  } else {
    alert("Email non registrata o password errata");
  }
}
