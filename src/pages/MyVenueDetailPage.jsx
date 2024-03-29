import React from "react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/api";
import { Link, useParams } from "react-router-dom";
import * as storage from "../storage/index";
import viteLogo from "/src/vite.svg";
import checkIcon from "../../public/Icon-check.png";
import closIcon from "../../public/Icon-close.png";
import breakfastIcon from "../../public/Icon-breakfast.png";
import parkingIcon from "../../public/Icon-parking.png";
import petsIcon from "../../public/Icon-pets.png";
import wifiIcon from "../../public/Icon-wifi.png";
import personIcon from "../../public/Icon-person.png";
import starIcon from "../../public/Icon-star.png";

const token = storage.load("token");

async function removeVanue(id) {
  const url = BASE_URL + "/venues/" + id;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
  console.log(response);
}

function MyVenueDetailPage() {
  let { id } = useParams();
  const url = BASE_URL + "/venues/" + id + "?_owner=true&_bookings=true";
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);

        setIsLoading(true);
        const response = await fetch(url);

        const json = await response.json();
        setPosts(json);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      } finally {
        setShowPage(true);
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
  if (showPage) {
    const {
      id,
      name,
      description,
      media,
      meta,
      owner,
      location,
      maxGuests,
      bookings,
      rating,
      price,
    } = posts;

    console.log(posts);
    console.log(media);
    return (
      <div className="bg-sky-50">
        <Link className=" text-blue-800" to={"/myvenue"}>
          my venues/...
        </Link>
        <h1 className="flex  justify-center py-4">{name}</h1>

        <div className="  rounded-lg shadow-xl">
          <div className="flex justify-around flex-wrap m-5"></div>
          <div className="flex items-center flex-col">
            <div className="flex flex-wrap m-2 items-center flex-col">
              <div className="flex flex-wrap">
                {posts.media.map((pic) => (
                  <div key={pic}>
                    <img src={pic} alt="venue pic" className="h-48 m-2"></img>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div></div>
          {/* Icons */}
          <div className="flex flex-row justify-evenly m-3 flex-wrap">
            <div className="flex justify-between">
              <p>Brakfast: </p>
              <div className="flex">
                {posts.meta.breakfast ? (
                  <div>
                    <img src={checkIcon} />
                  </div>
                ) : (
                  <div>
                    <img src={closIcon} />
                  </div>
                )}
                <img src={breakfastIcon} className="ml-4 sm-icons"></img>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Parking: </p>
              <div className="flex">
                {meta.parking ? (
                  <img src={checkIcon} />
                ) : (
                  <img src={closIcon} />
                )}
                <img src={parkingIcon} className="ml-4 sm-icons"></img>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Pets: </p>
              <div className="flex">
                {meta.pets ? <img src={checkIcon} /> : <img src={closIcon} />}
                <img src={petsIcon} className="ml-4 sm-icons"></img>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Wifi: </p>
              <div className="flex">
                {meta.wifi ? <img src={checkIcon} /> : <img src={closIcon} />}
                <img src={wifiIcon} className="ml-4 sm-icons"></img>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Guests: </p>
              <div className="flex">
                <p>{maxGuests}</p>
                <img src={personIcon} className="ml-6 sm-icons"></img>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="my-5 mx-14 stronger-text">Price: {price} NOK</p>
            <div className="flex m-5 mx-14">
              <p className="stronger-text">{rating}</p>
              <img src={starIcon} alt="" className="ml-6 sm-icons " />
            </div>
          </div>
          <hr />
          <div className="flex justify-between flex-wrap">
            <div className="mx-14 my-5">
              <p className="stronger-text">Location:</p>
              <p>{location.address},</p>
              <p> {location.city},</p>
              <p> {location.country}</p>
              <p> {location.continent}</p>
            </div>
            <div className="w-80 mx-14 my-5">
              <p className="stronger-text">About the place:</p>
              <p>{description}</p>
            </div>
          </div>
          <div className="flex justify-center">
            {/* <button> */}
            <Link
              onClick={() => removeVanue(id)}
              to={"/myvenue"}
              className="btn-danger m-5"
            >
              Delete
            </Link>
            {/* </button> */}
            <Link
              to={"/myvenue/modifymyvenue/" + id}
              className="btn-primary m-5"
            >
              Modify page
            </Link>
          </div>
          <div>
            <h2 className="flex  justify-center py-4">Bokings:</h2>
            <div>
              {bookings.map((book) => (
                <div
                  key={book.id}
                  className=" bg-sky-100 rounded-lg shadow-xl m-5"
                >
                  <p>From:{book.dateFrom}</p>
                  <p>To:{book.dateTo}</p>
                  <p>Creted:{book.created}</p>
                  <p>Guests:{book.guests}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MyVenueDetailPage;
