import React from "react";
import { Link } from "react-router-dom";
import viteLogo from "/src/vite.svg";

function VenuesCards(props) {
  const {
    id,
    name,
    description,
    media,
    meta,
    owner,
    maxGuests,
    rating,
    price,
    location,
  } = props.post;
  return (
    <Link className="m-5" to={"venue/" + id + "?_owner=true&_bookings=true"}>
      <div>
        <div className=" bg-sky-50 rounded-lg shadow-xl">
          <h2 className=" p-3 place-items-start">{name}</h2>
          <div className="flex justify-between">
            <div>
              {media.length > 0 ? (
                <img
                  className="h-48 w-48  object-fill ml-3  rounded-lg "
                  src={media[0]}
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
                  {meta.breakfast ? (
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
                  {meta.parking ? (
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
                  {meta.pets ? (
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
                  {meta.wifi ? (
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
                  <p>{maxGuests}</p>
                  <img
                    src="../../public/Icon-person.png"
                    className="ml-6 sm-icons"
                  ></img>
                </div>
              </div>
              <div className="flex justify-between">
                <p>Rating: </p>
                <div className="flex">
                  <p>{rating}</p>
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
            <p>{price} NOK</p>
          </div>
          <div className="stronger-text m-3 flex justify-between">
            <p>Location:</p>
            <p>
              {location.city}, {location.country}
            </p>
          </div>
          <p className="  text-l px-3 pb-3 truncate overflow-hidden ">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
export default VenuesCards;
