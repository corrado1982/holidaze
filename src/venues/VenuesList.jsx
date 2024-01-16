import React, { useEffect, useState } from "react";
import { BASE_URL, VENUES } from "../constants/api";
import { Link } from "react-router-dom";
import viteLogo from "/src/vite.svg";

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
        <Link key={post.id} to={"venue/" + post.id}>
          <div>
            <h2>{post.name}</h2>
            <p>{post.description}</p>
            <div>
              {post.media.length > 0 ? (
                <img src={post.media} alt="image of"></img>
              ) : (
                <img src={viteLogo} />
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VenuesList;
