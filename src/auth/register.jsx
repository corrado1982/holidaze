import { BASE_URL } from "../constants/api";
import { REGISTER_URL } from "../constants/api";
import { onLogin } from "./login";

export async function onRegister(data) {
  // 1. Creiamo l'oggetto corretto per la v2
  const bodyV2 = {
    name: data.name,
    email: data.email,
    password: data.password,
    venueManager: data.venueManager || false,
    // Se c'è un avatar, lo trasformiamo in oggetto. Altrimenti non lo mandiamo.
    avatar: data.avatar
      ? { url: data.avatar, alt: `${data.name} avatar` }
      : undefined,
  };

  const response = await fetch(BASE_URL + REGISTER_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(bodyV2), // Mandiamo bodyV2, non data!
  });

  const result = await response.json();

  if (response.ok) {
    const profile = { email: data.email, password: data.password };
    await onLogin(profile);
  } else {
    // Leggiamo il messaggio di errore REALE (es. "Avatar must be a valid URL")
    console.log("Errore dettagliato:", result);
    alert(`Errore: ${result.errors?.[0]?.message || "Controlla i dati"}`);
  }
}
