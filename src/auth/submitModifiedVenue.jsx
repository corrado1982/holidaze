import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";

// import React from "react";

const token = storage.load("token");
// let { id } = useParams();
// mo faccio
// accomme a cosa
export async function submitModifiedVenue(id, data) {
  //   let { id } = useParams();
  event.preventDefault();
  //   const post = stringify(data);

  //   event.preventDefault();
  console.log("data: " + data);
  console.log("id : " + id);

  const response = await fetch(BASE_URL + "/venues/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify(data),
  });

  console.log(response);
  if (response.ok) {
    alert("Modified");
    // window.location.href = "/";
  }

  // return response;
}
