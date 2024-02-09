import React, { useEffect, useState } from "react";
// import { useId } from "react";
import { json, useParams } from "react-router-dom";
import { BASE_URL, VENUES } from "../constants/api";
// import viteLogo from "/src/vite.svg";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import VenueCardDetail from "../venues/VenueCardDetail";
import BookingForm from "../components/BookingForm";

const url = BASE_URL + VENUES;

function VenuePage() {
  // const [startDate, setStartDate] = useState(new Date());
  // const [endtDate, setEndDate] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPage, setShowPage] = useState(false);

  // console.log(startDate);
  // console.log(endtDate);
  let { id } = useParams();
  console.log(id);

  const urlVenue = url + "/" + id + "?_owner=true&_bookings=true";

  useEffect(() => {
    async function getData() {
      try {
        setShowPage(false);
        setIsError(false);

        setIsLoading(true);
        const response = await fetch(urlVenue);
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
  console.log(posts);

  if (isLoading) {
    return <div>Loading posts</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (showPage) {
    // const {
    //   name,
    //   description,
    //   media,
    //   owner,
    //   meta,
    //   location,
    //   maxGuests,
    //   bookings,
    //   rating,
    //   price,
    // } = posts;
    return (
      <div>
        <div className="bg-sky-50 rounded-lg shadow-xl size-3/5 m-auto">
          <VenueCardDetail post={posts} />
          <BookingForm guestinfo={posts} />
        </div>
      </div>
    );
  }
}
export default VenuePage;
