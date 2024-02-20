import React, { useState } from "react";
import { Link, json, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";
import { isItLogged } from "./isItLogged";
import BookingVenueConfirm from "./modal/bookingVenueConfirm";

const url = BASE_URL + "/bookings";

// let { id } = useParams();
function BookingForm(props) {
  const { maxGuests, id, bookings } = props.guestinfo;
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(0);
  const [okResponse, setOkResponse] = useState(false);

  // const isWeekday = (date) => {
  //   const day = getDay(date);
  //   return day !== 0 && day !== 6;
  // };

  //   let bookedStart = [];
  //   let allBooking = [];
  //   let bookedEnd = [];

  //   let mnDate = [{}];
  //   let mxDate = "";
  //   console.log(mnDate);

  //   };
  //   const [startDate, setStartDate] = useState(new Date());
  //   const [endDate, setEndDate] = useState(null);
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
  //   console.log(bookings.dateFrom);

  async function onBookingSubmit(e) {
    e.preventDefault();
    const data = {
      guests,
      dateFrom,
      dateTo,
      venueId,
    };

    // console.log(body);
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
    // bookingVenueConfirm();
  }
  console.log(okResponse);
  //   function bookedDates() {
  //     return (
  //       <div>
  //         <ul>
  //           {bookings.map((book) => (
  //             <li key={book.id}>
  //               {book.dateFrom}
  //               {book.dateTo}
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     );
  //   }

  //   let startBooking = [];
  //   let endBooking = [];
  //   let bookedStart = "";
  //   let allBooking = [];
  //   const bookedDates =
  // bookings.map(function (book, index) {
  // allBooking = book.dateTo + book.dateTo + index;
  // bookedStart += book.dateFrom;
  // bookedEnd += book.dateTo;
  // startBooking.push(book.dateFrom);
  // endBooking.push(book.dateTo);
  // console.log(startBooking);
  // console.log(endBooking);
  // console.log("from: " + book.dateFrom + index);
  // console.log("to: " + book.dateTo);
  // console.log(book.dateTo + book.index);
  //     if (book) return book.dateFrom;
  // });
  //   console.log("from: " + book.dateFrom);
  //   return book.dateFrom;
  //   console.log(allBooking);

  function handleGuestQuantity(event) {
    const value = event.target.value;
    if (event.target.name === "quantity") {
      setGuests(Number(value));
    }
  }
  //   console.log("book" + allBooking);
  return (
    <div>
      {okResponse && (
        <div>
          <BookingVenueConfirm />
        </div>
      )}

      <div>
        {/* {" "}
      <ul>
        {bookings.map((book) => (
          <li key={book.id}>
            from: {book.dateFrom} to :{book.dateTo}
            <br />
            <hr />
          </li>
        ))}
      </ul> */}
        {isItLogged() ? (
          <form
            className="flex flex-col items-center"
            onSubmit={onBookingSubmit}
          >
            {/* onSubmit={onBookingSubmit} */}
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
              inline
              required
            />
            <button className=" btn-primary mx-auto my-10">
              Book it
              {/* <Link to="/mybookings" className=" btn-primary mx-auto my-10">
              Book it
            </Link> */}
            </button>
          </form>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default BookingForm;
