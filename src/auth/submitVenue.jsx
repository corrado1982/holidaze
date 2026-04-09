import { BASE_URL, API_KEY } from "../constants/api";
import * as storage from "../storage/index";

const token = storage.load("token");

export async function submitVenue(data) {
  // 1. Costruiamo l'oggetto base
  const bodyV2 = {
    name: data.name,
    description: data.description,
    price: Number(data.price),
    maxGuests: Number(data.maxGuests),
    rating: Number(data.rating) || 0,
    meta: {
      wifi: !!data.meta?.wifi,
      parking: !!data.meta?.parking,
      breakfast: !!data.meta?.breakfast,
      pets: !!data.meta?.pets,
    },
    location: {
      address: data.location?.address || null,
      city: data.location?.city || null,
      zip: data.location?.zip || null,
      country: data.location?.country || null,
      continent: data.location?.continent || null,
    },
  };

  // Estraiamo l'URL in modo pulito
  let imageUrl = "";

  if (typeof data.media === "string" && data.media.trim() !== "") {
    imageUrl = data.media.trim();
  } else if (Array.isArray(data.media) && data.media.length > 0) {
    // Se per caso arriva come array, prendiamo il primo elemento
    imageUrl =
      typeof data.media[0] === "string" ? data.media[0] : data.media[0].url;
  }

  // Costruiamo l'array media finale per la v2
  bodyV2.media = imageUrl
    ? [{ url: imageUrl, alt: data.name || "Venue image" }]
    : [];

  console.log("BODY CREAZIONE FINALE:", bodyV2);

  // 3. Chiamata Fetch
  try {
    const response = await fetch(BASE_URL + "/holidaze/venues", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "e0de0b9e-bddb-4b0c-8302-55da4d4d4489", // La tua API Key
      },
      method: "POST",
      body: JSON.stringify(bodyV2),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Your venue is created!");
      window.location.href = "/myvenue";
    } else {
      // Mostriamo il messaggio d'errore specifico inviato dal server
      const message = result.errors?.[0]?.message || "Could not create venue";
      alert(`Error: ${message}`);
      console.error("Errore dettagliato server:", result);
    }
  } catch (error) {
    console.error("Errore di rete:", error);
    alert("Network error, please try again.");
  }
}
