import React, { useEffect, useState } from "react";
import { BASE_URL, VENUES } from "../constants/api";
import { Link } from "react-router-dom";
import viteLogo from "/src/vite.svg";
import VenuesCards from "./VenuesCards";

const url = BASE_URL + VENUES;

function VenuesList() {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);

        setIsLoading(true);
        const response = await fetch(url);
        // + "?_owner=true&_bookings=true"
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
      {posts.map((post) => (
        <VenuesCards key={post.id} post={post} />
      ))}
    </div>
  );

  // return (
  //   <div>
  //     {posts.map((post) => (
  //       <div key={post.id}>
  //         <div>
  //           <p>{post.owner.name}</p>
  //           <h2>{post.name}</h2>
  //           <p>{post.description}</p>
  //           <div>
  //             {post.media.length > 0 ? (
  //               <img src={post.media} alt="image of"></img>
  //             ) : (
  //               <img src={viteLogo} />
  //             )}
  //           </div>
  //         </div>
  //         <Link to={"venue/" + post.id + "?_owner=true&_bookings=true"}>
  //           Details
  //         </Link>
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default VenuesList;
