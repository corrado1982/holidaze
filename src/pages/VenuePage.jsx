import React, { useEffect, useState } from "react";
import { useId } from "react";
import { json, useParams } from "react-router-dom";
import { BASE_URL, VENUES } from "../constants/api";
import viteLogo from "/src/vite.svg";

const url = BASE_URL + VENUES;

function VenuePage() {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const [showPage, setShowPage] = useState(false);

  let { id } = useParams();

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
    const { name, description, media, owner, meta } = posts;
    return (
      <div>
        <div>
          <p>{owner.name}</p>
          <h2>{name}</h2>
          <p>{description}</p>
          <div>
            {/* {posts.media ? (
            <img src={posts.media} alt="image of"></img>
          ) : (
            <img src={viteLogo} />
          )} */}
            {media.map((pic) => (
              <img key={pic} src={pic} alt="{viteLogo}"></img>
            ))}
            {/* {owner.media.map((own) => (
            <p>{own.name}</p>
          ))} */}
          </div>
        </div>
      </div>
    );
  }

  //   console.log(meta.wifi);
  //   return (
  //     <div>
  //       <div>
  //         <p>{owner.name}</p>
  //         <h2>{name}</h2>
  //         <p>{description}</p>
  //         <div>
  //           {/* {posts.media ? (
  //             <img src={posts.media} alt="image of"></img>
  //           ) : (
  //             <img src={viteLogo} />
  //           )} */}
  //           {/* {posts.media.map((pic) => ( */}
  //           <img src={media} alt="{viteLogo}"></img>
  //           {/* ))} */}
  //           {/* {owner.media.map((own) => (
  //             <p>{own.name}</p>
  //           ))} */}
  //         </div>
  //       </div>
  //     </div>
  //   );
}
export default VenuePage;
