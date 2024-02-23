import { useEffect, useState } from "react";
import * as storage from "../storage/index.js";
import { BASE_URL } from "../constants/api";
// import { useNavigate } from "react-router-dom";

let avatar = storage.load("avatar");
let userName = storage.load("username");
const token = storage.load("token");

export function Avatar() {
  // const navigate = useNavigate();

  const [avatarImg, setAvatarImg] = useState(avatar);
  const [newAvatar, setNewAvatar] = useState(avatarImg);

  function onAvatarChange(event) {
    event.preventDefault();
    setAvatarImg(event.target.value);
    // avatar = storage.load("avatar");
  }

  async function upDateAvatar() {
    event.preventDefault();

    const response = await fetch(
      BASE_URL + "/profiles/" + userName + "/media",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({ avatar: avatarImg }),
      }
    );
    const data = await response.json();
    console.log(data);

    storage.save("avatar", data.avatar);
    setNewAvatar(storage.load("avatar"));
    // navigate("/");
  }
  return (
    <div className=" bg-sky-100 rounded-lg shadow-xl m-auto size-4/5">
      <img className="mx-auto my-5" src={newAvatar} />
      <form className="flex flex-col" onSubmit={upDateAvatar}>
        <input
          className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          value={newAvatar}
          placeholder="Avatar URL"
          onChange={onAvatarChange}
        />
        <button className=" btn-primary mx-auto my-5">Update</button>
      </form>
    </div>
  );
}

export default Avatar;
