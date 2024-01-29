import { useEffect, useState } from "react";
import * as storage from "../storage/index.js";
import { BASE_URL } from "../constants/api";

let avatar = storage.load("avatar");
const userName = storage.load("username");
const token = storage.load("token");

export function Avatar() {
  const [avatarImg, setAvatarImg] = useState(avatar);

  function onAvatarChange(event) {
    setAvatarImg(event.target.value);
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
    avatar = avatarImg;
  }

  return (
    <div>
      <img src={avatarImg} />
      <form onSubmit={upDateAvatar}>
        <input
          value={avatarImg}
          placeholder="Avatar URL"
          onChange={onAvatarChange}
        />
        <button>Update</button>
      </form>
    </div>
  );
}

export default Avatar;
