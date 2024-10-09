import React, { useState } from "react";

function Input() {
  const [image, setImage] = useState("");

  const uploadImage = (files) => {
    const formData = new FormData();

    formData.append("file", files[0]);
    formData.append("upload_preset", "<your upload preset>");
    fetch("https://api.cloudinary.com/v1_1/<your cloud name>/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImage(data.secure_url);
      });
  };
  return (
    <div>
      <input type="file" onChange={(e) => uploadImage(e.target.files)} />
      <img src={image} alt="uploaded image" />
    </div>
  );
}

export default Input;
