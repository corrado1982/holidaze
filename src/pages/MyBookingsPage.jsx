import React, { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from "../constants/api"; // Assicurati di avere API_KEY nelle costanti
import * as storage from "../storage/index";
import MyBookings from "../components/MyBookings";

function MyBookingsPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const user = storage.load("username");
  const token = storage.load("token");

  // URL corretto per v2: BASE_URL deve essere https://noroff.dev
  const url = `${BASE_URL}/holidaze/profiles/${user}/bookings?_venue=true`;

  useEffect(() => {
    async function getData() {
      if (!user || !token) {
        setIsError(true);
        return;
      }

      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": API_KEY, // <--- Usa la tua API Key qui
          },
          method: "GET",
        });

        const json = await response.json();

        if (response.ok) {
          // Nella v2 i dati sono dentro .data
          setPosts(json.data || []);
        } else {
          setIsError(true);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, [url, token, user]);

  if (isLoading) {
    return <div className="text-center p-10">Loading your bookings...</div>;
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-red-600">
        Error loading data. Please try to log in again.
      </div>
    );
  }

  return (
    <div className="bg-sky-100 min-h-dvh">
      <h1 className="flex justify-center py-4 text-2xl font-bold">
        My Bookings
      </h1>
      <div className="rounded-lg shadow-xl w-4/5 m-auto bg-white p-4">
        {posts.length > 0 ? (
          <MyBookings posts={posts} />
        ) : (
          <p className="text-center p-5">You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyBookingsPage;
