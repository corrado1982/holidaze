import React, { useEffect, useState } from "react";
import * as storage from "../storage/index";
import { BASE_URL, API_KEY } from "../constants/api"; // Assicurati che API_KEY sia nelle costanti
import { Link } from "react-router-dom";

import checkIcon from "../assets/Icon-check.png";
import closIcon from "../assets/Icon-close.png";
import breakfastIcon from "../assets/Icon-breakfast.png";
import parkingIcon from "../assets/Icon-parking.png";
import petsIcon from "../assets/Icon-pets.png";
import wifiIcon from "../assets/Icon-wifi.png";
import personIcon from "../assets/Icon-person.png";
import starIcon from "../assets/Icon-star.png";
import viteLogo from "../assets/vite.svg";

function MyVenuePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const user = storage.load("username");
  const token = storage.load("token");

  // URL corretto per v2: aggiungiamo /holidaze
  const url = `${BASE_URL}/holidaze/profiles/${user}/venues`;

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": API_KEY, // Obbligatorio nella v2
          },
          method: "GET",
        });

        const json = await response.json();

        if (response.ok) {
          // Nella v2 i dati sono in json.data
          setPosts(json.data || []);
        } else {
          setIsError(true);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    if (user && token) {
      getData();
    }
  }, [url, token, user]);

  if (isLoading)
    return <div className="text-center p-10">Loading your venues...</div>;
  if (isError)
    return (
      <div className="text-center p-10 text-red-600">Error loading data</div>
    );

  return (
    <div className="min-h-dvh">
      <h1 className="flex justify-center py-4 text-2xl font-bold">My Venues</h1>
      <div className="flex">
        <Link className="btn-primary m-auto my-10" to={"/createvenue"}>
          New Venue
        </Link>
      </div>

      {posts.length > 0 ? (
        posts.map((product) => (
          <div
            key={product.id}
            className="bg-sky-50 rounded-lg shadow-xl m-5 p-4"
          >
            <h2 className="text-xl font-bold p-3">{product.name}</h2>
            <div className="flex justify-between">
              <div>
                {/* Immagine v2: media è un array di oggetti {url, alt} */}
                {product.media?.length > 0 ? (
                  <img
                    className="h-48 w-48 object-cover ml-3 rounded-lg"
                    src={product.media[0].url}
                    alt={product.media[0].alt || product.name}
                  />
                ) : (
                  <img
                    className="h-48 w-48 object-cover ml-3 rounded-lg"
                    src={viteLogo}
                    alt="placeholder"
                  />
                )}
              </div>

              <div className="mr-3 w-40 flex flex-col justify-evenly">
                {/* Meta icons - aggiunto optional chaining ?. per sicurezza */}
                <div className="flex justify-between">
                  <p>Breakfast: </p>
                  <div className="flex">
                    {product.meta?.breakfast ? (
                      <img src={checkIcon} alt="yes" />
                    ) : (
                      <img src={closIcon} alt="no" />
                    )}
                    <img
                      src={breakfastIcon}
                      alt="icon"
                      className="ml-4 sm-icons"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Parking: </p>
                  <div className="flex">
                    {product.meta?.parking ? (
                      <img src={checkIcon} alt="yes" />
                    ) : (
                      <img src={closIcon} alt="no" />
                    )}
                    <img
                      src={parkingIcon}
                      alt="icon"
                      className="ml-4 sm-icons"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Pets: </p>
                  <div className="flex">
                    {product.meta?.pets ? (
                      <img src={checkIcon} alt="yes" />
                    ) : (
                      <img src={closIcon} alt="no" />
                    )}
                    <img src={petsIcon} alt="icon" className="ml-4 sm-icons" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Wifi: </p>
                  <div className="flex">
                    {product.meta?.wifi ? (
                      <img src={checkIcon} alt="yes" />
                    ) : (
                      <img src={closIcon} alt="no" />
                    )}
                    <img src={wifiIcon} alt="icon" className="ml-4 sm-icons" />
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Guests: </p>
                  <div className="flex">
                    <p>{product.maxGuests}</p>
                    <img
                      src={personIcon}
                      alt="icon"
                      className="ml-6 sm-icons"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Rating: </p>
                  <div className="flex">
                    <p>{product.rating}</p>
                    <img src={starIcon} alt="icon" className="ml-6 sm-icons" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between m-3 font-bold text-lg">
              <p>Price per night:</p>
              <p>{product.price} NOK</p>
            </div>

            <div className="m-3 flex justify-between font-semibold text-gray-700">
              <p>Location:</p>
              <p>
                {product.location?.city || "Unknown City"},{" "}
                {product.location?.country || "Unknown Country"}
              </p>
            </div>

            <p className="text-gray-600 px-3 pb-3 truncate">
              {product.description}
            </p>

            <div className="flex pb-5">
              <Link
                className="btn-primary m-auto mt-4"
                to={"myvenuedetail/" + product.id}
              >
                Manage & Details
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center p-10">You haven't created any venues yet.</p>
      )}
    </div>
  );
}

export default MyVenuePage;
