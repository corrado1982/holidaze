import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";
const user = storage.load("username");
const url =
  BASE_URL + "/profiles/" + user + "/bookings?_customer=true&_venue=true";

const token = storage.load("token");

function MyBookings() {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);

        setIsLoading(true);
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });

        const json = await response.json();
        setPosts(json);
        // console.log(json);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading posts</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  console.log(posts);

  return (
    <>
      <h1>My Bookings</h1>
      <div className="bg-sky-50 rounded-lg shadow-xl size-4/5 m-auto">
        {posts.map((myBooking) => (
          <div className="my-5 card-bg mx-auto flex" key={myBooking.id}>
            <img
              src={myBooking.venue.media[0]}
              alt=""
              className=" h-24 w-24 object-fill rounded-lg m-2"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h2>{myBooking.venue.name}</h2>
              </div>
              <div className="mb-2">
                <p>from: {myBooking.dateFrom}</p>
                <p>to: {myBooking.dateTo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyBookings;
