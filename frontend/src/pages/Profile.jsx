import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CameraIcon, Pencil } from "lucide-react";
import axios from "axios";
const backendBaseUrl = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const [editForm, setEditForm] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();

  const handleEdit = () => {
    setName(userData.name);
    setEditForm(true);
  };

  const handleChange = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.put(
        `${backendBaseUrl}/api/v1/user/update-profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditForm(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const { userData } = useSelector((state) => state.user);

  if (userData === null) {
    return <h1>Loading....</h1>;
  } else {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="border border-gray-200 shadow-xl p-5 rounded-lg min-w-[400px]">
          <form className="flex flex-col gap-5 mt-6">
            <div className="flex items-center justify-center relative min-h-[150px]">
              {/* Profile Image */}
              <img
                src={preview || userData.image || "person.png"}
                alt=""
                className="h-30 w-30 absolute rounded-full object-cover"
              />

              {/* Hidden File Input */}
              <input
                type="file"
                name="image"
                id="profileImage"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              {/* Camera Icon (clickable) */}
              {editForm && (
                <label htmlFor="profileImage">
                  <CameraIcon className="absolute right-15 bottom-3 text-white bg-black h-[30px] w-[30px] p-1 rounded-full cursor-pointer" />
                </label>
              )}
            </div>

            <input
              type="text"
              name="name"
              className={`${
                editForm
                  ? "border p-2 text-lg font-semibold outline-none rounded-md"
                  : "border p-2 text-lg font-semibold outline-none rounded-md text-gray-400"
              }`}
              onChange={(e) => setName(e.target.value)}
              value={editForm ? name : userData.name}
            />

            <input
              type="text"
              name="username"
              value={userData.username}
              className="border p-2 text-lg font-semibold text-gray-400 outline-none rounded-md"
              disabled
            />

            <input
              type="text"
              name="email"
              value={userData.email}
              className="border p-2 text-lg font-semibold text-gray-400 outline-none rounded-md"
              disabled
            />

            <button
              className="bg-zinc-900 text-white font-semibold p-2 rounded cursor-pointer flex items-center justify-center gap-2"
              type="button"
              onClick={editForm ? handleChange : handleEdit}
            >
              {editForm ? "Save" : `Edit Profile`}
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Profile;
