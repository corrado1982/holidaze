import React, { useEffect, useState } from "react";
import * as storage from "../storage/index";
import { BASE_URL } from "../constants/api";
import { Link, json } from "react-router-dom";

const user = storage.load("username");
const token = storage.load("token");
const url = BASE_URL + "/profiles/" + user + "/venues";

console.log(user);

function MyVenuePage() {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);

        setIsLoading(true);
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        console.log(response);
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
      <h1>Venues page</h1>
      {json ? <div>ok</div> : <div>not ok</div>}
      <Link className="btn-primary m-3">Create</Link>
    </div>
  );
}

export default MyVenuePage;
