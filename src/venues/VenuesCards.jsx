import React from "react";
import { Link } from "react-router-dom";
import viteLogo from "/src/vite.svg";

function VenuesCards(props) {
  const { id, name, description, media, owner } = props.post;
  return (
    <Link to={"venue/" + id + "?_owner=true&_bookings=true"}>
      <div>
        <div>
          {/* <p>{owner.name}</p> */}
          <h2>{name}</h2>
          <p>{description}</p>
          <div>
            {media.length > 0 ? (
              <img src={media[0]} alt="image of"></img>
            ) : (
              <img src={viteLogo} />
            )}
          </div>
        </div>
        Details
      </div>
    </Link>
  );
}
export default VenuesCards;
