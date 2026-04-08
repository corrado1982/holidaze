import { BASE_URL, API_KEY } from "../constants/api";
import * as storage from "../storage/index";

const token = storage.load("token");

export async function submitVenue(data) {
  // Rimuovi event.preventDefault() se usi handleSubmit di React Hook Form nel componente

  // 1. TRASFORMAZIONE DATI PER V2
  // L'API v2 vuole media come array di oggetti e numeri per price/maxGuests
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
    location: data.location || {},
  };

  // AGGIUNGIAMO media SOLO SE l'utente ha inserito un URL
  if (
    data.media &&
    typeof data.media === "string" &&
    data.media.trim() !== ""
  ) {
    bodyV2.media = [
      {
        url: data.media.trim(),
        alt: data.name || "Venue image",
      },
    ];
  }

  // 2. URL CORRETTO PER V2 (/holidaze/venues)
  const response = await fetch(BASE_URL + "/holidaze/venues", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": "e0de0b9e-bddb-4b0c-8302-55da4d4d4489", // <--- Obbligatorio
    },
    method: "POST",
    body: JSON.stringify(bodyV2),
  });

  const result = await response.json();

  if (response.ok) {
    alert("Your venue is created!");
    window.location.href = "/myvenue"; // Ti rimanda alla tua lista
  } else {
    // Leggiamo il vero errore se fallisce
    console.error("Errore creazione:", result);
    alert(`Error: ${result.errors?.[0]?.message || "Could not create venue"}`);
  }
}
