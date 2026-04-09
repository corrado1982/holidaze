import { BASE_URL, API_KEY } from "../constants/api";
import * as storage from "../storage/index";

const token = storage.load("token");

export async function submitModifiedVenue(id, data) {
  let imageUrl = "";

  if (typeof data.media === "string") {
    imageUrl = data.media;
  } else if (Array.isArray(data.media) && data.media[0]?.url) {
    imageUrl = data.media[0].url;
  } else if (data.media?.url) {
    imageUrl = data.media.url;
  }

  const bodyV2 = {
    name: data.name,
    description: data.description,
    price: Number(data.price),
    maxGuests: Number(data.maxGuests),
    // 2. Creiamo l'array corretto (UN SOLO LIVELLO)
    media: imageUrl ? [{ url: imageUrl, alt: data.name || "Venue image" }] : [],
    meta: data.meta,
    location: data.location,
  };

  console.log("BODY CORRETTO:", JSON.stringify(bodyV2, null, 2));

  console.log("ID da modificare:", id);
  console.log("Dati inviati:", data);

  // URL corretto per v2: aggiungiamo /holidaze
  const url = `${BASE_URL}/holidaze/venues/${id}`;
  console.log("BODY INVIATO:", JSON.stringify(bodyV2, null, 2));
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY, // Obbligatorio nella v2
      },
      method: "PUT",
      body: JSON.stringify(bodyV2),
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
