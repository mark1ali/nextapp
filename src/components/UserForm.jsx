"use client";
import { redirect } from 'next/navigation';
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function UserForm({ propsFormData, userId }) {
    console.log("propsFormData propos")
    console.log(userId)
    console.log(propsFormData)

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [pending, startTransition] =  useTransition();
  const [formData, setFormData] = useState({
    file: null,
    name: propsFormData.name?propsFormData.name:"",
    email: propsFormData.email?propsFormData.email:"",
    companyId: propsFormData.companyId?propsFormData.companyId:""
  });

  const [message, setMessage] = useState("");
  const [allCompany, setAllCompany] = useState([]);
  const uploadFormData = new FormData();

  useEffect(() => {
    setPreview(propsFormData.profile_path);

    fetch('/api/company')
    .then((response) => response.json())
    .then((data) => setAllCompany(data))
    .catch((error) => console.error('Error fetching data:', error));
  },[propsFormData.profile_path])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show preview before uploading
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    startTransition(async () => {
      
      console.log(formData)
      const data1 = new FormData();
      data1.append("file", formData.file);
      data1.append("name", formData.name);
      data1.append("email", formData.email);
      data1.append("companyId", formData.companyId);
      let res = [];
      if(userId > 0) {
          res = await fetch(`/api/users?id=${userId}`, {
              method: "PUT",
              body: data1,
          });
      }else {
          res = await fetch("/api/users", {
              method: "POST",
              body: data1,
          });
      }
      const data = await res.json();
      setMessage(data.message);
      toast.success("User added successful!");
      redirect('/users');
      if (res.ok) setFormData({ name: "", email: "" });
    });
    
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="form-group">
          <label htmlFor="email">User Name:</label>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">User Email:</label>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Company:</label>
          <select name="companyId" value={formData.companyId}  onChange={handleChange} className="form-group">
          <option value="">Select Company</option>
            {allCompany.map((company) => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
             
          </select>
        </div>        
        <div className="form-group">
          <label htmlFor="pwd">Profile Picture:</label>
          <input type="file" onChange={handleFileChange} />
          
          {preview &&  <Image 
              src={preview} 
              alt="Uploaded Image" 
              width={100} 
              height={100} 
              className="rounded-lg shadow-lg"
            />}
        </div>

        <button disabled={pending} value={"Submit"} type="submit" className="btn btn-default">Submit</button>
          
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}

    </div>
  );
}
