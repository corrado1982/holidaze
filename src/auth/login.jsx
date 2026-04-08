import { BASE_URL } from "../constants/api";
import { LOGIN_URL } from "../constants/api";
import * as storage from "../storage/index.js";
import { API_KEY } from "../constants/api.js";

export async function onLogin(data) {
  const response = await fetch(BASE_URL + LOGIN_URL, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (response.ok) {
    const userData = json.data;
    const token = userData.accessToken;

    // --- NUOVA CHIAMATA PER RECUPERARE IL MANAGER STATUS ---
    const profileResponse = await fetch(
      `${BASE_URL}/holidaze/profiles/${userData.name}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": `${API_KEY}`, // Assicurati di usare la tua chiave
        },
      },
    );
    const profileJson = await profileResponse.json();
    const isManager = profileJson.data.venueManager;
    // -------------------------------------------------------

    storage.save("token", token);
    storage.save("username", userData.name);
    storage.save("avatar", userData.avatar?.url);
    storage.save("manager", isManager); // Ora questo sarà TRUE o FALSE correttamente
    storage.save("profile", profileJson.data);

    console.log("profileJson", profileJson);

    location.href = "/";
  } else {
    alert("Email o password errati");
  }
}
