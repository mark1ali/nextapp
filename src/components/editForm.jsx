"use client";
import { redirect } from 'next/navigation';
import Link from "next/link";

import { useState } from "react";
import React from 'react'
import { toast } from 'sonner';
import UserForm from './UserForm';

const EditForm = ({ userData,userId }) => {
  
  const [formData, setFormData] = useState({ name: userData.name, email: userData.email, companyId: userData.companyId, profile_path: userData.profile_path });     
    
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <UserForm propsFormData={formData} userId={userId} />

      <Link href={`/users`}>Back to users list</Link>
    </>
  )
}

export default EditForm
