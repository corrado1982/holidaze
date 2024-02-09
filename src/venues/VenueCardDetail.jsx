import React from "react";

function VenueCardDetail(props) {
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
            src={owner.avatar}
            alt={owner.name}
            className="h-20 w-20 rounded-full"
          />
        </div>
        <div className=" stronger-text my-auto">
          <p>{owner.name}</p>
          <p>{owner.email}</p>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <h2>{name}</h2>
        {/* <p className="mx-14">{description}</p> */}
        <div className="flex flex-wrap m-2">
          {/* {posts.media ? (
<img src={posts.media} alt="image of"></img>
) : (
<img src={viteLogo} />
)} */}
          {media.map((pic) => (
            <img key={pic} src={pic} alt="venue pic" className="h-48 m-2"></img>
          ))}
          {/* {owner.media.map((own) => (
<p>{own.name}</p>
))} */}
        </div>
      </div>
      {/* Icons */}
      <div className="flex flex-row justify-evenly m-3 flex-wrap">
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
      </div>
      <div className="flex justify-between">
        <p className="my-5 mx-14 stronger-text">Price: {price} NOK</p>
        <div className="flex m-5 mx-14">
          <p className="stronger-text">{rating}</p>
          <img
            src="../../public/Icon-star.png"
            alt=""
            className="ml-6 sm-icons "
          />
        </div>
      </div>
      <hr />
      <div className="flex justify-between flex-wrap">
        <div className="mx-14 my-5">
          <p className="stronger-text">Location:</p>
          <p>{location.address},</p>
          <p> {location.city},</p>
          <p> {location.country}</p>
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
