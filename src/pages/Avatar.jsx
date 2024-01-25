import { useState } from "react";
import * as storage from "../storage/index.js";
import { BASE_URL } from "../constants/api";

const avatar = storage.load("avatar");
const userName = storage.load("username");
const token = storage.load("token");
// console.log(avatar);

export function Avatar() {
  const [avatarImg, setAvatarImg] = useState(avatar);

  function onAvatarChange(event) {
    setAvatarImg(event.target.value);
    console.log(avatarImg);
  }

  async function upDateAvatar() {
    event.preventDefault();
    // console.log(data);
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
    console.log(response);

    if (response.ok) {
      storage.save("avatar", data.avatar);

      console.log(user);

      // return;
    }
  }
  // console.log(avatar);
  return (
    <div>
      <img src={avatar} />
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
