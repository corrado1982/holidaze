import React, { useState } from "react";
import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";
import viteLogo from "/src/vite.svg";
import { Link } from "react-router-dom";
// import { removePost } from "../pages/MyBookingsPage";

const token = storage.load("token");

function MyBookings(props) {
  // const { venue, dateFrom, dateTo, id } = props.posts;
  const [bookings, setBookings] = useState(props.posts);
  // console.log(bookings.id);
  // console.log(props);
  async function removePost(id) {
    const urlRemove = BASE_URL + "/bookings/" + id;
    const response = await fetch(urlRemove, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });

    console.log(response);
    const oldBookings = [...bookings];
    const updatedBookings = oldBookings.filter((booking) => booking.id !== id);
    console.log(updatedBookings);
    setBookings(updatedBookings);

    // if (response.ok) {
    //   // MyBookings;
    //   alert("Your booking is deleteted");
    //   location.href = "/";
    // }
  }
  console.log(bookings);
  console.log(props.post);
  return (
    <>
      <div>
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="my-5 card-bg mx-auto flex-col flex flex-wrap justify-around"
          >
            <div className="flex  justify-around flex-wrap">
              {booking.venue.media.length > 0 ? (
                <img
                  src={booking.venue.media[0]}
                  alt={booking.venue.name}
                  className=" h-24 w-24 object-fill rounded-lg m-2"
                />
              ) : (
                <img
                  src={viteLogo}
                  alt={booking.venue.name}
                  className=" h-24 w-24 object-fill rounded-lg m-2"
                />
              )}

              {/* <img
            src={venue.media[0]}
            alt={venue.name}
            className=" h-24 w-24 object-fill rounded-lg m-2"
          /> */}
              <div className="flex flex-wrap">
                <div className="flex  flex-col justify-between">
                  <div>
                    <h2 className=" w-80">{booking.venue.name}</h2>
                  </div>
                  <div className="mb-2">
                    <p>from: {booking.dateFrom}</p>
                    <p>to: {booking.dateTo}</p>
                  </div>

                  {/* <Link to={"/venue/" + booking.id}>Look</Link> */}
                </div>
                <div>
                  <p>{booking.venue.location.address}</p>
                  <p>{booking.venue.location.zip}</p>
                  <p>{booking.venue.location.city}</p>
                  <p>{booking.venue.location.country}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => removePost(booking.id)}
              className="btn-danger m-auto my-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default MyBookings;
