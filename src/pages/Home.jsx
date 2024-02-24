import React from "react";
import VenuesList from "../venues/VenuesList";

function Home() {
  return (
    <div className="bg-sky-100">
      <h2 className=" flex  justify-center py-4">Choose a venue</h2>
      <VenuesList />
      <div></div>
    </div>
  );
}

export default Home;
