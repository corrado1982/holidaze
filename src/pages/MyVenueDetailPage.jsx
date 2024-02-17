import React from "react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/api";
import { Link, useParams } from "react-router-dom";
import * as storage from "../storage/index";
import { submitModifiedVenue } from "../auth/submitModifiedVenue";

const token = storage.load("token");

// function handleRemoveClick() {
//   removeVanue();
// }

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
        // console.log(json);
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
      owner,
      meta,
      location,
      maxGuests,
      bookings,
      rating,
      price,
    } = posts;
    console.log(posts);
    return (
      // NEW AS EXPERIMENT
      <div>
        <Link to={"/myvenue"}>Back</Link>
        <h1>Single Venue</h1>
        <form onSubmit={submitModifiedVenue}>
          <div className=" bg-sky-50 rounded-lg shadow-xl">
            <div className="flex justify-around flex-wrap m-5"></div>
            <div className="flex items-center flex-col">
              <input type="text" defaultValue={name} />
              <h2>{name + ",   id: " + id}</h2>

              <div className="flex flex-wrap m-2">
                {media.map((pic) => (
                  <div key={pic}>
                    <img src={pic} alt="venue pic" className="h-48 m-2"></img>
                    <input type="url" defaultValue={pic} />
                  </div>
                ))}
              </div>
            </div>
            {/* Icons */}
            <div className="flex flex-row justify-evenly m-3 flex-wrap">
              <div className="flex justify-between">
                <p>Brakfast: </p>
                <div className="flex">
                  {meta.breakfast ? (
                    <>
                      <input type="checkbox" defaultValue={true} />
                      {/* <img src="../../public/Icon-check.png" /> */}
                    </>
                  ) : (
                    <>
                      <input type="checkbox" defaultValue={false} />
                      {/* <img src="../../public/Icon-close.png" /> */}
                    </>
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
            <div>
              <h2>Bokings:</h2>
              <div className=" bg-sky-100 rounded-lg shadow-xl">
                {bookings.map((book) => (
                  <div key={book.id}>
                    <p>From:{book.dateFrom}</p>
                    <p>To:{book.dateTo}</p>
                    <p>Creted:{book.created}</p>
                    <p>Guests:{book.guests}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => removeVanue(id)}>
              <Link to={"/myvenue"} className="btn-primary">
                Delete
              </Link>
            </button>
            <button className="btn-primary">modify</button>
            {/* <Link to={"/myvenue/modifymyvenue/" + id} className="btn-primary">
              Modify
            </Link> */}
          </div>
        </form>
      </div>
      // OLD TO KEEP
      // <div>
      //   <Link to={"/myvenue"}>Back</Link>
      //   <h1>Single Venue</h1>
      //   <div className=" bg-sky-50 rounded-lg shadow-xl">
      //     <div className="flex justify-around flex-wrap m-5"></div>
      //     <div className="flex items-center flex-col">
      //       <h2>{name}</h2>

      //       <div className="flex flex-wrap m-2">
      //         {media.map((pic) => (
      //           <img
      //             key={pic}
      //             src={pic}
      //             alt="venue pic"
      //             className="h-48 m-2"
      //           ></img>
      //         ))}
      //       </div>
      //     </div>
      //     {/* Icons */}
      //     <div className="flex flex-row justify-evenly m-3 flex-wrap">
      //       <div className="flex justify-between">
      //         <p>Brakfast: </p>
      //         <div className="flex">
      //           {meta.breakfast ? (
      //             <img src="../../public/Icon-check.png" />
      //           ) : (
      //             <img src="../../public/Icon-close.png" />
      //           )}
      //           <img
      //             src="../../public/Icon-breakfast.png"
      //             className="ml-4 sm-icons"
      //           ></img>
      //         </div>
      //       </div>
      //       <div className="flex justify-between">
      //         <p>Parking: </p>
      //         <div className="flex">
      //           {meta.parking ? (
      //             <img src="../../public/Icon-check.png" />
      //           ) : (
      //             <img src="../../public/Icon-close.png" />
      //           )}
      //           <img
      //             src="../../public/Icon-parking.png"
      //             className="ml-4 sm-icons"
      //           ></img>
      //         </div>
      //       </div>
      //       <div className="flex justify-between">
      //         <p>Pets: </p>
      //         <div className="flex">
      //           {meta.pets ? (
      //             <img src="../../public/Icon-check.png" />
      //           ) : (
      //             <img src="../../public/Icon-close.png" />
      //           )}
      //           <img
      //             src="../../public/Icon-pets.png"
      //             className="ml-4 sm-icons"
      //           ></img>
      //         </div>
      //       </div>
      //       <div className="flex justify-between">
      //         <p>Wifi: </p>
      //         <div className="flex">
      //           {meta.wifi ? (
      //             <img src="../../public/Icon-check.png" />
      //           ) : (
      //             <img src="../../public/Icon-close.png" />
      //           )}
      //           <img
      //             src="../../public/Icon-wifi.png"
      //             className="ml-4 sm-icons"
      //           ></img>
      //         </div>
      //       </div>
      //       <div className="flex justify-between">
      //         <p>Guests: </p>
      //         <div className="flex">
      //           <p>{maxGuests}</p>
      //           <img
      //             src="../../public/Icon-person.png"
      //             className="ml-6 sm-icons"
      //           ></img>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="flex justify-between">
      //       <p className="my-5 mx-14 stronger-text">Price: {price} NOK</p>
      //       <div className="flex m-5 mx-14">
      //         <p className="stronger-text">{rating}</p>
      //         <img
      //           src="../../public/Icon-star.png"
      //           alt=""
      //           className="ml-6 sm-icons "
      //         />
      //       </div>
      //     </div>
      //     <hr />
      //     <div className="flex justify-between flex-wrap">
      //       <div className="mx-14 my-5">
      //         <p className="stronger-text">Location:</p>
      //         <p>{location.address},</p>
      //         <p> {location.city},</p>
      //         <p> {location.country}</p>
      //       </div>
      //       <div className="w-80 mx-14 my-5">
      //         <p className="stronger-text">About the place:</p>
      //         <p>{description}</p>
      //       </div>
      //     </div>
      //     <div>
      //       <h2>Bokings:</h2>
      //       <div className=" bg-sky-100 rounded-lg shadow-xl">
      //         {bookings.map((book) => (
      //           <div key={book.id}>
      //             <p>From:{book.dateFrom}</p>
      //             <p>To:{book.dateTo}</p>
      //             <p>Creted:{book.created}</p>
      //             <p>Guests:{book.guests}</p>
      //           </div>
      //         ))}
      //       </div>
      //     </div>
      //     <button onClick={() => removeVanue(id)}>
      //       <Link to={"/myvenue"} className="btn-primary">
      //         Delete
      //       </Link>
      //     </button>
      //     <Link to={"/myvenue/modifymyvenue/" + id} className="btn-primary">
      //       Modify
      //     </Link>
      //   </div>
      // </div>
    );
  }
}
export default MyVenueDetailPage;
