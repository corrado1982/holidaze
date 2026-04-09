import { useState } from "react";
import * as storage from "../storage/index.js";
import { BASE_URL, API_KEY } from "../constants/api";

export function Avatar() {
  const userName = storage.load("username");
  const token = storage.load("token");
  const initialAvatar = storage.load("avatar"); // Assumiamo sia una stringa URL

  const [avatarImg, setAvatarImg] = useState(initialAvatar);

  function onAvatarChange(event) {
    setAvatarImg(event.target.value);
  }

  async function upDateAvatar(event) {
    event.preventDefault();

    // URL corretto per v2
    const url = `${BASE_URL}/holidaze/profiles/${userName}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY, // Obbligatorio
        },
        method: "PUT",
        // Formato oggetto richiesto dalla v2
        body: JSON.stringify({
          avatar: {
            url: avatarImg,
            alt: `${userName} avatar`,
          },
        }),
      });

      const json = await response.json();

      if (response.ok) {
        // Nella v2 i dati tornano in json.data.avatar.url
        const newUrl = json.data.avatar.url;
        storage.save("avatar", newUrl);
        setAvatarImg(newUrl);
        alert("Avatar updated successfully!");
      } else {
        alert("Error: " + (json.errors?.[0]?.message || "Failed to update"));
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  }

  return (
    <div className="bg-sky-100 rounded-lg shadow-xl m-auto size-4/5 min-h-screen p-5">
      <img
        className="mx-auto my-5 h-40 w-40 rounded-full object-cover border-4 border-white shadow-lg"
        src={avatarImg || "fallback-url-se-vuoto"}
        alt="Profile"
      />
      <form className="flex flex-col" onSubmit={upDateAvatar}>
        <input
          className="form-input px-4 py-3 border rounded my-5 m-auto size-1/2"
          value={avatarImg}
          placeholder="Paste new Avatar URL here"
          onChange={onAvatarChange}
        />
        <button type="submit" className="btn-primary mx-auto my-5">
          Update Avatar
        </button>
      </form>
    </div>
  );
}

export default Avatar;
