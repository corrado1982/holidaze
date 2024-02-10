import React from "react";
import * as storage from "../storage/index";
import { BASE_URL } from "../constants/api";
// import MyBookingsPage from "../pages/MyBookingsPage";

// const url = BASE_URL + "/bookings/"+ id;

const token = storage.load("token");

export async function removePost(id) {
  const url = BASE_URL + "/bookings/" + id;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
  console.log(response);
}

function MyBookings(props) {
  const { venue, dateFrom, dateTo, id } = props.post;

  return (
    <div className="my-5 card-bg mx-auto flex justify-around" key={id}>
      <img
        src={venue.media[0]}
        alt=""
        className=" h-24 w-24 object-fill rounded-lg m-2"
      />
      <div className="flex">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className=" w-80">{venue.name}</h2>
          </div>
          <div className="mb-2">
            <p>from: {dateFrom}</p>
            <p>to: {dateTo}</p>
          </div>
          <button
            onClick={() => removePost(id)}
            className="btn-primary m-auto my-3"
          >
            Delete
          </button>
        </div>
        <div>
          <p>{venue.location.address}</p>
          <p>{venue.location.zip}</p>
          <p>{venue.location.city}</p>
          <p>{venue.location.country}</p>
        </div>
      </div>
    </div>
  );
}
export default MyBookings;
