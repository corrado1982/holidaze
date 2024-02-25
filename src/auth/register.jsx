import { BASE_URL } from "../constants/api";
import { REGISTER_URL } from "../constants/api";
import { onLogin } from "./login";

export async function onRegister(data) {
  event.preventDefault();
  console.log(data);
  const response = await fetch(BASE_URL + REGISTER_URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  const profile = { email: data.email, password: data.password };
  console.log(response);
  console.log(data.password);
  console.log(data.email);

  if (response.ok) {
    await onLogin(profile);
    console.log(profile);
  } else {
    alert(`Your name must not contain empty space " "`);
  }
}
