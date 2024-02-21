import { BASE_URL } from "../constants/api";
import * as storage from "../storage/index";

const token = storage.load("token");

export async function submitVenue(data) {
  event.preventDefault();

  console.log(data);
  const response = await fetch(BASE_URL + "/venues", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  console.log(response);
  if (response.ok) {
    alert("Your venue is created");
    location.href = "/";
  }
}
