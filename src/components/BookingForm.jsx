import React, { useState } from "react";
import { Link, json, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";
import { isItLogged } from "./isItLogged";
import { subDays, addDays, getDay } from "date-fns";

// import BookingVenueConfirm from "./modal/bookingVenueConfirm";

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
  console.log(bookings);

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

  let startBooking = [];
  let endBooking = [];
  let rangeBooking = [];

  // const isWeekday = () => {
  //   // const day = getDay(dates);
  //   bookings.map((book) => {
  //     startBooking = book.dateFrom;
  //     endBooking = book.dateTo;

  //     // console.log("start: " + startBooking);
  //     // console.log("end: " + endBooking);
  //   });
  //   const beginning = startBooking;

  //   // console.log(day);
  //   return beginning;
  // };
  // console.log("start: " + startBooking);
  // console.log("end: " + endBooking);

  // let startBook = bookings.map((startBook) => {
  //   // startBooking = book.dateFrom;
  //   // endBooking = book.dateTo;
  //   // rangeBooking += startBooking + endBooking;

  //   console.log("start: " + startBooking);
  //   console.log("end: " + endBooking);
  //   return { date: startBook.dateFrom };
  // });
  // console.log(startBook);
  // bookings.forEach((book) => (startBooking += book.dateFrom));

  // bookings.forEach((book) => (endBooking += book.dateTo));

  bookings.forEach(
    (book) => (rangeBooking = { start: book.dateFrom, end: book.dateTo })
  );

  console.log("start: " + startBooking);
  console.log("end: " + endBooking);

  function handleGuestQuantity(event) {
    const value = event.target.value;
    if (event.target.name === "quantity") {
      setGuests(Number(value));
    }
  }
  console.log("book" + rangeBooking);

  // let rangeBooking = "";

  // bookings.forEach(
  //   (book) => (rangeBooking += { start: book.dateFrom, end: book.dateTo })
  // );
  // console.log("range" + rangeBooking);
  return (
    <div>
      {/* {okResponse && (
        <div>
          <BookingVenueConfirm />
        </div>
      )} */}

      <div>
        {" "}
        {/* <ul>
          {bookings.map((book) => (
            <li key={book.id}>
              from: {book.dateFrom} to :{book.dateTo}
              <br />
              <hr />
            </li>
          ))}
        </ul> */}
        {okResponse && (
          <div>
            Response is Ok!
            <Link to="/mybookings" className=" btn-primary mx-auto my-10">
              GO to My Bookings
            </Link>
            {/* <BookingVenueConfirm /> */}
          </div>
        )}
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
              // excludeDates={[startBook]}
              // filterDate={isWeekday}
              excludeDateIntervals={[rangeBooking]}
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
