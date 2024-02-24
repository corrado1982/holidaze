import React, { useEffect, useState } from "react";
import { BASE_URL, VENUES } from "../constants/api";
import { Link } from "react-router-dom";
import viteLogo from "/src/vite.svg";
import VenuesCards from "./VenuesCards";
import VenuesFilter from "./VenuesFilter";
// + "?limit=10"
const url = BASE_URL + VENUES + "?sort=created&sortOrder=desc";

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
      <VenuesFilter posts={posts} />
      <div className="mt-6 px-4 grid grid-cols-1 lg:grid-cols-2  2xl:grid-cols-3  gap-x-12 gap-y-10">
        {posts.map((post) => (
          <VenuesCards key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default VenuesList;
