"use client"

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview before uploading
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("image data.....")
      console.log(data)
      if (res.ok) {
        alert("Upload successful!");
        setPreview(data.url); // Show uploaded image
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
        console.log(error)
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Upload Image to Cloudinary</h1>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" width={200} />}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
