"use client";
import { redirect } from 'next/navigation';
import Link from "next/link";
import { useState } from "react";

export default function AddCompany() {
  const [formData, setFormData] = useState({ name: "", totalUsers: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("form submit..")
    const res = await fetch("/api/company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log("data..")
    console.log(res)
    const data = await res.json();
    console.log(data)
    setMessage(data.message);
    redirect('/company');

    if (res.ok) setFormData({ name: "", email: "" });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="totalUsers" placeholder="totalUsers" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Company</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}

      <Link href={`/company`}>Back to company list</Link>
    </div>
  );
}
