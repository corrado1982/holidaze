import React, { useState, useEffect } from "react";
import { BASE_URL, API_KEY } from "../constants/api";
import * as storage from "../storage/index";
import viteLogo from "/src/vite.svg";

function MyBookings(props) {
  // Inizializziamo lo stato con i posts ricevuti dalle props
  const [bookings, setBookings] = useState(props.posts || []);
  const token = storage.load("token");

  // Aggiorna lo stato se le props cambiano (es. dopo il caricamento asincrono)
  useEffect(() => {
    setBookings(props.posts);
  }, [props.posts]);

  async function removePost(id) {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    // URL corretto per v2: /holidaze/bookings/ID
    const urlRemove = `${BASE_URL}/holidaze/bookings/${id}`;

    try {
      const response = await fetch(urlRemove, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY, // Obbligatorio nella v2
        },
        method: "DELETE",
      });

      if (response.ok) {
        // Rimuoviamo il booking dallo stato locale senza ricaricare la pagina
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        setBookings(updatedBookings);
        alert("Booking deleted successfully");
      } else {
        alert("Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  }

  return (
    <div>
      {bookings?.map((booking) => (
        <div
          key={booking.id}
          className="my-5 card-bg mx-auto flex-col flex flex-wrap justify-around p-4 border rounded"
        >
          <div className="flex justify-around flex-wrap">
            {/* Controllo immagine per v2: media è un array di oggetti {url, alt} */}
            {booking.venue?.media?.length > 0 ? (
              <img
                src={booking.venue.media[0].url}
                alt={booking.venue.media[0].alt || booking.venue.name}
                className="h-24 w-24 object-cover rounded-lg m-2"
              />
            ) : (
              <img
                src={viteLogo}
                alt="placeholder"
                className="h-24 w-24 object-cover rounded-lg m-2"
              />
            )}

            <div className="flex flex-wrap flex-1 ml-4">
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold">{booking.venue?.name}</h2>
                </div>
                <div className="mb-2 text-sm">
                  <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                  <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="ml-auto text-sm text-gray-600">
                <p>{booking.venue?.location?.address}</p>
                <p>{booking.venue?.location?.city}</p>
                <p>{booking.venue?.location?.country}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => removePost(booking.id)}
            className="bg-red-500 text-white px-4 py-2 rounded m-auto my-3 hover:bg-red-700"
          >
            Delete Booking
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
