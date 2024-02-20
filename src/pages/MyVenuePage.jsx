import React, { useEffect, useState } from "react";
import * as storage from "../storage/index";
import { BASE_URL } from "../constants/api";
import { Link, json } from "react-router-dom";

import viteLogo from "/vite.svg";
const user = storage.load("username");
const token = storage.load("token");
const url = BASE_URL + "/profiles/" + user + "/venues";

console.log(user);

function MyVenuePage() {
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
        console.log(response);
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
    <div>
      <h1>Venues page</h1>
      <Link to={"/createvenue"} className="btn-primary m-auto my-10 flex">
        New Venue
      </Link>
      {posts.map((product) => (
        <div key={product.id}>
          <div className=" bg-sky-50 rounded-lg shadow-xl">
            <h2 className=" p-3 place-items-start">{product.name}</h2>
            <div className="flex justify-between">
              <div>
                {product.media.length > 0 ? (
                  <img
                    className="h-48 w-48  object-fill ml-3  rounded-lg "
                    src={product.media[0]}
                    alt="image of"
                  ></img>
                ) : (
                  <img
                    className="h-48 w-48  object-fill ml-3  rounded-lg "
                    src={viteLogo}
                  />
                )}
              </div>
              <div className="mr-3 w-40 flex flex-col justify-evenly">
                <div className="flex justify-between">
                  <p>Brakfast: </p>
                  <div className="flex">
                    {product.meta.breakfast ? (
                      <img src="../../public/Icon-check.png" />
                    ) : (
                      <img src="../../public/Icon-close.png" />
                    )}
                    <img
                      src="../../public/Icon-breakfast.png"
                      className="ml-4 sm-icons"
                    ></img>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Parking: </p>
                  <div className="flex">
                    {product.meta.parking ? (
                      <img src="../../public/Icon-check.png" />
                    ) : (
                      <img src="../../public/Icon-close.png" />
                    )}
                    <img
                      src="../../public/Icon-parking.png"
                      className="ml-4 sm-icons"
                    ></img>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Pets: </p>
                  <div className="flex">
                    {product.meta.pets ? (
                      <img src="../../public/Icon-check.png" />
                    ) : (
                      <img src="../../public/Icon-close.png" />
                    )}
                    <img
                      src="../../public/Icon-pets.png"
                      className="ml-4 sm-icons"
                    ></img>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Wifi: </p>
                  <div className="flex">
                    {product.meta.wifi ? (
                      <img src="../../public/Icon-check.png" />
                    ) : (
                      <img src="../../public/Icon-close.png" />
                    )}
                    <img
                      src="../../public/Icon-wifi.png"
                      className="ml-4 sm-icons"
                    ></img>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Guests: </p>
                  <div className="flex">
                    <p>{product.maxGuests}</p>
                    <img
                      src="../../public/Icon-person.png"
                      className="ml-6 sm-icons"
                    ></img>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Rating: </p>
                  <div className="flex">
                    <p>{product.rating}</p>
                    <img
                      src="../../public/Icon-star.png"
                      className="ml-6 sm-icons"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between m-3 stronger-text">
              <p>Price per nigth:</p>
              <p>{product.price} NOK</p>
            </div>
            <div className="stronger-text m-3 flex justify-between">
              <p>Location:</p>
              <p>
                {product.location.city}, {product.location.country}
              </p>
            </div>
            <p className="  text-l px-3 pb-3 truncate overflow-hidden ">
              {product.description}
            </p>
            {/* <Link
              to={"/myvenue/modifymyvenue/" + product.id}
              className="btn-primary"
            >
              modify page
            </Link> */}
            <Link
              to={"myvenuedetail/" + product.id}
              className="btn-primary"
              key={product.id}
              post={product}
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyVenuePage;
