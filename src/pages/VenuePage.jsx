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

  // The useEffect will run once when the component first mounts
  useEffect(() => {
    // Function that gets our posts
    async function getData() {
      try {
        setShowPage(false);
        setIsError(false);

        setIsLoading(true);
        const response = await fetch(urlVenue);
        const json = await response.json();
        // Setting our `posts` state to the API data we received
        setPosts(json);
        // console.log(posts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      } finally {
        setShowPage(true);
      }
    }
    getData();
    // getData(`${url}/${id}?_owner=true&_bookings=true`);
  }, []);
  console.log(posts);
  //   console.log(posts.owner.name);
  if (isLoading) {
    return <div>Loading posts</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }
  //   console.log(id);
  //   console.log(posts.media.length);

  //   let pictureDetail;
  //   if (posts.media.length > 0) {
  //     pictureDetail = <img src={posts.media} alt="image of" />;
  //   } else {
  //     pictureDetail = <div>pic missing</div>;
  //   }
  //   const idPic = useId();

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
