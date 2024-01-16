import { useParams } from "react-router-dom";
import { BASE_URL, VENUES } from "../constants/api";
import { useEffect, useState } from "react";
import viteLogo from "/src/vite.svg";

const url = BASE_URL + VENUES;

function VenuePage() {
  const [posts, setPosts] = useState([]);
  let { id } = useParams();

  // The useEffect will run once when the component first mounts
  useEffect(() => {
    // Function that gets our posts
    async function getData(url) {
      const response = await fetch(url);
      const json = await response.json();
      // Setting our `posts` state to the API data we received
      setPosts(json);
      console.log(json);
    }
    getData(`${url}/${id}`);
  }, [id]);
  console.log(id);
  //   console.log(posts.media.length);

  //   let pictureDetail;
  //   if (posts.media.length > 0) {
  //     pictureDetail = <img src={posts.media} alt="image of" />;
  //   } else {
  //     pictureDetail = <div>pic missing</div>;
  //   }
  return (
    <div>
      <div>
        <h2>{posts.name}</h2>
        <p>{posts.description}</p>
        <div>
          {posts.media ? (
            <img src={posts.media} alt="image of" />
          ) : (
            <div>pic missing</div>
          )}
          {/* {posts.media.map((pic) => ( */}
          {/* <img src={posts.media} alt="image of"></img> */}
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}
export default VenuePage;
