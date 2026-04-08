import React from "react";

import viteLogo from "../assets/vite.svg";

import checkIcon from "../assets/Icon-check.png";

import closIcon from "../assets/Icon-close.png";

import breakfastIcon from "../assets/Icon-breakfast.png";
import parkingIcon from "../assets/Icon-parking.png";
import petsIcon from "../assets/Icon-pets.png";
import wifiIcon from "../assets/Icon-wifi.png";
import personIcon from "../assets/Icon-person.png";
import starIcon from "../assets/Icon-star.png";

function VenueCardDetail(props) {
  if (!props.post) return <div className="text-center p-10">Loading...</div>;
  const {
    name,
    description,
    media,
    owner,
    meta,
    location,
    maxGuests,
    bookings,
    rating,
    price,
  } = props.post;

  return (
    <div>
      <div className="flex justify-around flex-wrap m-5">
        <div className="m-5">
          <img
            src={owner?.avatar?.url}
            alt={owner?.name}
            className="h-20 w-20 rounded-full"
          />
        </div>
        <div className=" text-sm  md:text-lg md:stronger-text stronger-text my-auto">
          <p>Owner: {owner?.name}</p>
          <p>Email: {owner?.email}</p>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <h2>{name}</h2>

        <div className="flex flex-wrap m-2">
          {media?.length < 1 && (
            <img
              className="h-48 w-48  object-fill ml-3  rounded-lg "
              src={viteLogo}
              alt="image of"
            ></img>
          )}

          {media?.map((pic, index) => (
            <img
              key={index}
              src={pic.url}
              alt={pic.alt || "venue pic"}
              className="h-48 m-2"
            ></img>
          ))}
        </div>
      </div>
      {/* Icons */}
      <div className="flex flex-row justify-evenly m-3 flex-wrap">
        <div className="flex justify-between">
          <p>Brakfast: </p>
          <div className="flex">
            {meta?.breakfast ? <img src={checkIcon} /> : <img src={closIcon} />}
            <img
              src={breakfastIcon}
              alt="breakfastIcon"
              className="ml-4 sm-icons"
            ></img>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Parking: </p>
          <div className="flex">
            {meta?.parking ? <img src={checkIcon} /> : <img src={closIcon} />}
            <img
              src={parkingIcon}
              alt="parkingIcon"
              className="ml-4 sm-icons"
            ></img>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Pets: </p>
          <div className="flex">
            {meta?.pets ? <img src={checkIcon} /> : <img src={closIcon} />}
            <img src={petsIcon} alt="petsIcon" className="ml-4 sm-icons"></img>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Wifi: </p>
          <div className="flex">
            {meta?.wifi ? <img src={checkIcon} /> : <img src={closIcon} />}
            <img src={wifiIcon} alt="wifiIcon" className="ml-4 sm-icons"></img>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Guests: </p>
          <div className="flex">
            <p>{maxGuests}</p>
            <img
              src={personIcon}
              alt="personIcon"
              className="ml-6 sm-icons"
            ></img>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <p className="my-5 mx-14 stronger-text">Price: {price} NOK</p>
        <div className="flex m-5 mx-14">
          <p className="stronger-text">{rating}</p>
          <img src={starIcon} alt="starIcon" className="ml-6 sm-icons " />
        </div>
      </div>
      <hr />
      <div className="flex justify-between flex-wrap">
        <div className="mx-14 my-5">
          <p className="stronger-text">Location:</p>
          <p>{location?.address || "No address"},</p>
          <p> {location?.city || "No city"},</p>
          <p> {location?.country || "No country"}</p>
        </div>
        <div className="w-80 mx-14 my-5">
          <p className="stronger-text">About the place:</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
export default VenueCardDetail;
