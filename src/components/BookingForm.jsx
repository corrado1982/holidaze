import React, { useState } from "react";
import { Link, json, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";
import { isItLogged } from "./isItLogged";

const url = BASE_URL + "/bookings";

function BookingForm(props) {
  const { maxGuests, id, bookings } = props.guestinfo;
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(0);
  const [okResponse, setOkResponse] = useState(false);

  console.log(bookings);

  const onChange = (dates) => {
    const [start, end] = dates;
    setDateFrom(start);
    setDateTo(end);
  };
  const token = storage.load("token");
  const venueId = id;
  console.log(dateFrom);
  console.log(dateTo);
  console.log(guests);
  console.log(bookings);

  async function onBookingSubmit(e) {
    e.preventDefault();
    const data = {
      guests,
      dateFrom,
      dateTo,
      venueId,
    };

    console.log(id);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(response);
    {
      response.ok && setOkResponse(true);
    }
  }
  console.log(okResponse);

  let rangeBooking = [];

  bookings.forEach(
    (book) => (rangeBooking = { start: book.dateFrom, end: book.dateTo })
  );

  function handleGuestQuantity(event) {
    const value = event.target.value;
    if (event.target.name === "quantity") {
      setGuests(Number(value));
    }
  }
  console.log("book" + rangeBooking);

  return (
    <div>
      <div>
        {" "}
        {okResponse && (
          <div className="flex flex-col border-2 rounded-md border-green-600 bg-green-300 m-5">
            <p className="  mx-auto my-10">Your booking is done!</p>

            <Link to="/mybookings" className=" btn-primary mx-auto my-10">
              GO to My Bookings
            </Link>
          </div>
        )}
        {isItLogged() ? (
          <form
            className="flex flex-col items-center"
            onSubmit={onBookingSubmit}
          >
            <label htmlFor="quantity">
              Guests: (between 1 and {maxGuests}):
            </label>
            <input
              className="my-5"
              type="number"
              name="quantity"
              min="1"
              max={maxGuests}
              onChange={handleGuestQuantity}
              required
            ></input>

            <DatePicker
              selected={dateFrom}
              onChange={onChange}
              startDate={dateFrom}
              endDate={dateTo}
              selectsRange
              selectsDisabledDaysInRange
              excludeDateIntervals={[rangeBooking]}
              inline
              required
            />
            <button className=" btn-primary mx-auto my-10">Book it</button>
          </form>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default BookingForm;
