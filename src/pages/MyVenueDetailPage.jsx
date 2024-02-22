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
// import { submitModifiedVenue } from "../auth/submitModifiedVenue";

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

  // const [name, setName] = useState(posts.name);
  // const [media, setMedia] = useState(posts.media);
  // const [breakfast, setBreakfast] = useState();
  // console.log(posts.media);
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

  // async function onSubmit(event) {
  //   event.preventDefault();
  //   // let breakfast = posts.meta.breakfast;
  //   // const media = posts.media;
  //   const body = { name, media };
  //   console.log(media);
  //   console.log("data: " + body);
  //   console.log("id : " + id);

  //   const response = await fetch(BASE_URL + "/venues/" + id, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     method: "PUT",
  //     body: JSON.stringify(body),
  //   });

  //   console.log(response);
  // }
  // function onNameChange(event) {
  //   setName(event.target.value);
  // }
  // function onDeleteMedia() {
  //   setMedia([]);
  // }
  // function onMediaChange(event) {
  //   setMedia(event.target.value.split(",").map((pic) => pic.trim()));
  // }
  // function onBreackfastChange(event) {
  //   setBreakfast(event.target.value);
  // }
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
      // NEW AS EXPERIMENT
      <div>
        <Link to={"/myvenue"}>my venues/...</Link>
        <h1>Single Venue</h1>
        {/* <form onSubmit={onSubmit}> */}
        <div className=" bg-sky-50 rounded-lg shadow-xl">
          <div className="flex justify-around flex-wrap m-5"></div>
          <div className="flex items-center flex-col">
            <h2>{name}</h2>

            <div className="flex flex-wrap m-2 items-center flex-col">
              {/* {media[0] ? ( */}
              <div>
                {posts.media.map((pic) => (
                  <div key={pic}>
                    <img src={pic} alt="venue pic" className="h-48 m-2"></img>
                    {/* <div>
                          <input
                            type="url"
                            defaultValue={media}
                            onChange={onMediaChange}
                          />
                        </div> */}
                    {/* <input
                        type="url"
                        defaultValue={pic}
                        onChange={onMediaChange}
                      /> */}
                    {/* <button onClick={() => onButtonClick(10)}>Click</button> */}
                  </div>
                ))}
                {/* <div>
                    <input
                      type="url"
                      defaultValue={media}
                      onChange={onMediaChange}
                    />
                  </div> */}
              </div>
              {/* ) : ( */}

              {/* )} */}

              {/* <input
                  type="url"
                  defaultValue="text"
                  onChange={onMediaChange}
                /> */}
            </div>
          </div>
          <div>
            {/* <button onClick={onDeleteMedia} className="btn-primary">
                delete picture
              </button> */}

            {/* <input
                type="url"
                defaultValue={posts.media}
                onChangeCapture={onMediaChange}
              /> */}
            {/* <button onClick={onMediaChange} className="btn-primary">
                update picture
              </button> */}
          </div>
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
          <Link to={"/myvenue/modifymyvenue/" + id} className="btn-primary">
            modify page
          </Link>
          {/* <button className="btn-primary">Modify</button> */}
          {/* <Link to={"/myvenue/modifymyvenue/" + id} className="btn-primary">
              Modify
            </Link> */}
        </div>
        {/* </form> */}
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
