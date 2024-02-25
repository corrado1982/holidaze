import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";
import MyBookings from "../components/MyBookings";

const user = storage.load("username");
const url =
  BASE_URL + "/profiles/" + user + "/bookings?_customer=true&_venue=true";

const token = storage.load("token");

function MyBookingsPage() {
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
    <div className="bg-sky-100">
      <h1 className="flex  justify-center py-4">My Bookings</h1>
      <div className=" rounded-lg shadow-xl size-4/5 m-auto">
        <MyBookings key={posts.id} posts={posts} />
      </div>
    </div>
  );
}

export default MyBookingsPage;
