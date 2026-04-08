import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";
import { isItLogged } from "./isItLogged";

// 1. URL CORRETTO PER V2 (con /holidaze)
const url = BASE_URL + "/holidaze/bookings";

function BookingForm(props) {
  const { maxGuests, id, bookings } = props.guestinfo;
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(1); // Inizializza a 1, non 0
  const [okResponse, setOkResponse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = storage.load("token");
  const apiKey = "e0de0b9e-bddb-4b0c-8302-55da4d4d4489"; // <--- METTI QUI LA TUA API KEY

  const onChange = (dates) => {
    const [start, end] = dates;
    setDateFrom(start);
    setDateTo(end);
  };

  async function onBookingSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    // 2. FORMATO DATI PER V2 (ISO String)
    const data = {
      guests: guests,
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo ? dateTo.toISOString() : null,
      venueId: id,
    };

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey, // <--- OBBLIGATORIO NELLA V2
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setOkResponse(true);
      } else {
        setErrorMessage(result.errors?.[0]?.message || "Booking failed");
      }
    } catch (error) {
      setErrorMessage("Network error, try again.");
    }
  }

  // 3. LOGICA CALENDARIO (Array di intervalli occupati)
  const rangeBooking =
    bookings?.map((book) => ({
      start: new Date(book.dateFrom),
      end: new Date(book.dateTo),
    })) || [];

  return (
    <div>
      {okResponse && (
        <div className="flex flex-col border-2 rounded-md border-green-600 bg-green-300 m-5">
          <p className="mx-auto my-10">Your booking is done!</p>
          <Link to="/mybookings" className="btn-primary mx-auto my-10">
            GO to My Bookings
          </Link>
        </div>
      )}

      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}

      {isItLogged() ? (
        <form className="flex flex-col items-center" onSubmit={onBookingSubmit}>
          <label htmlFor="quantity">Guests (1 to {maxGuests}):</label>
          <input
            className="my-5 border p-2"
            type="number"
            name="quantity"
            min="1"
            max={maxGuests}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
          />

          <DatePicker
            selected={dateFrom}
            onChange={onChange}
            startDate={dateFrom}
            endDate={dateTo}
            selectsRange
            excludeDateIntervals={rangeBooking} // <--- Mostra date occupate
            inline
            required
          />
          <button type="submit" className="btn-primary mx-auto my-10">
            Book it
          </button>
        </form>
      ) : (
        <p className="text-center p-5">Please login to book.</p>
      )}
    </div>
  );
}

export default BookingForm;
