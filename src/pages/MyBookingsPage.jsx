import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";
import MyBookings from "../components/MyBookings";

const user = storage.load("username");
const url =
  BASE_URL + "/profiles/" + user + "/bookings?_customer=true&_venue=true";

const token = storage.load("token");

// const urlRemove = BASE_URL + "/bookings/" + id;

export async function removePost(id) {
  // const [remove, setRemove] = useState(false);

  const urlRemove = BASE_URL + "/bookings/" + id;
  const response = await fetch(urlRemove, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
  console.log(response);
}
// async function removePost() {
//   setRemove(true);
// }
function MyBookingsPage() {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  // const [remove, setRemove] = useState(false);
  // remove = false;

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
        {posts.map((post) => (
          <MyBookings key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default MyBookingsPage;
