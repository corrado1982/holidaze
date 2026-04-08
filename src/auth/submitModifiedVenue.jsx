import { BASE_URL, API_KEY } from "../constants/api";
import * as storage from "../storage/index";

const token = storage.load("token");

export async function submitModifiedVenue(id, data) {
  // Rimosso event.preventDefault() perché data non è un evento

  console.log("ID da modificare:", id);
  console.log("Dati inviati:", data);

  // URL corretto per v2: aggiungiamo /holidaze
  const url = `${BASE_URL}/holidaze/venues/${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY, // Obbligatorio nella v2
      },
      method: "PUT",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Venue modified successfully!");
      window.location.href = "/myvenue"; // Ti riporta alla lista delle tue venue
    } else {
      console.error("Errore modifica:", result);
      alert(
        `Error: ${result.errors?.[0]?.message || "Could not update venue"}`,
      );
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("An error occurred during the update.");
  }
}
