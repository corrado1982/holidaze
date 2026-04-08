import React, { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from "../constants/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as storage from "../storage/index";

import viteLogo from "../assets/vite.svg";
import checkIcon from "../assets/Icon-check.png";
import closIcon from "../assets/Icon-close.png";
import breakfastIcon from "../assets/Icon-breakfast.png";
import parkingIcon from "../assets/Icon-parking.png";
import petsIcon from "../assets/Icon-pets.png";
import wifiIcon from "../assets/Icon-wifi.png";
import personIcon from "../assets/Icon-person.png";
import starIcon from "../assets/Icon-star.png";

function MyVenueDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const token = storage.load("token");
  const url = `${BASE_URL}/holidaze/venues/${id}?_owner=true&_bookings=true`;

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
          setVenue(json.data); // v2 usa .data
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url]);

  async function removeVenue(id) {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;

    const deleteUrl = `${BASE_URL}/holidaze/venues/${id}`;
    try {
      const response = await fetch(deleteUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY, // Obbligatorio
        },
        method: "DELETE",
      });

      if (response.ok) {
        alert("Venue deleted successfully");
        navigate("/myvenue"); // Torna alla lista
      } else {
        alert("Failed to delete venue");
      }
    } catch (error) {
      alert("Error deleting venue");
    }
  }

  if (isLoading)
    return <div className="text-center p-10">Loading venue details...</div>;
  if (isError || !venue)
    return (
      <div className="text-center p-10 text-red-600">Error loading venue.</div>
    );

  // Destrutturazione sicura dall'oggetto venue
  const {
    name,
    description,
    media,
    meta,
    location,
    maxGuests,
    bookings,
    rating,
    price,
  } = venue;

  return (
    <div className="bg-sky-50 min-h-screen p-5">
      <Link className="text-blue-800 underline" to={"/myvenue"}>
        &larr; Back to my venues
      </Link>

      <h1 className="text-center text-3xl font-bold py-6">{name}</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        {/* Gallery */}
        <div className="flex flex-wrap justify-center mb-6">
          {media && media.length > 0 ? (
            media.map((pic, index) => (
              <img
                key={index}
                src={pic.url}
                alt={pic.alt || name}
                className="h-48 w-64 object-cover m-2 rounded-lg shadow"
              />
            ))
          ) : (
            <img src={viteLogo} alt="No image" className="h-48 m-2" />
          )}
        </div>

        {/* Icons / Meta */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-y py-6 my-4">
          <div className="flex items-center justify-between px-4">
            <span>Breakfast:</span>
            <div className="flex items-center">
              <img
                src={meta?.breakfast ? checkIcon : closIcon}
                alt=""
                className="w-6"
              />
              <img src={breakfastIcon} alt="" className="w-6 ml-2" />
            </div>
          </div>
          <div className="flex items-center justify-between px-4">
            <span>Parking:</span>
            <div className="flex items-center">
              <img
                src={meta?.parking ? checkIcon : closIcon}
                alt=""
                className="w-6"
              />
              <img src={parkingIcon} alt="" className="w-6 ml-2" />
            </div>
          </div>
          <div className="flex items-center justify-between px-4">
            <span>Pets:</span>
            <div className="flex items-center">
              <img
                src={meta?.pets ? checkIcon : closIcon}
                alt=""
                className="w-6"
              />
              <img src={petsIcon} alt="" className="w-6 ml-2" />
            </div>
          </div>
          <div className="flex items-center justify-between px-4">
            <span>Wifi:</span>
            <div className="flex items-center">
              <img
                src={meta?.wifi ? checkIcon : closIcon}
                alt=""
                className="w-6"
              />
              <img src={wifiIcon} alt="" className="w-6 ml-2" />
            </div>
          </div>
          <div className="flex items-center justify-between px-4">
            <span>Guests:</span>
            <div className="flex items-center">
              <span className="font-bold">{maxGuests}</span>
              <img src={personIcon} alt="" className="w-6 ml-2" />
            </div>
          </div>
          <div className="flex items-center justify-between px-4">
            <span>Rating:</span>
            <div className="flex items-center">
              <span className="font-bold">{rating}</span>
              <img src={starIcon} alt="" className="w-6 ml-2" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-xl font-bold text-green-700">
            Price: {price} NOK / night
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 border-t pt-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Location:</h3>
            <p>{location?.address || "No address"}</p>
            <p>
              {location?.city}, {location?.country}
            </p>
            <p className="italic text-gray-500">{location?.continent}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">About the place:</h3>
            <p className="text-gray-700">{description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => removeVenue(id)}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-800"
          >
            Delete Venue
          </button>
          <Link
            to={"/myvenue/modifymyvenue/" + id}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Modify Venue
          </Link>
        </div>

        {/* Bookings Section */}
        <div className="mt-12 border-t pt-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Bookings for this venue:
          </h2>
          <div className="grid gap-4">
            {bookings && bookings.length > 0 ? (
              bookings.map((book) => (
                <div
                  key={book.id}
                  className="bg-sky-100 p-4 rounded-lg shadow-sm border border-sky-200"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <p>
                      <strong>From:</strong>{" "}
                      {new Date(book.dateFrom).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>To:</strong>{" "}
                      {new Date(book.dateTo).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Guests:</strong> {book.guests}
                    </p>
                    <p className="text-gray-500">
                      <strong>Created:</strong>{" "}
                      {new Date(book.created).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No bookings yet for this venue.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyVenueDetailPage;
