"use client";
import { redirect } from 'next/navigation';
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import UserForm from '../../../components/UserForm';

export default function AddUser() {
   

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>      
      <UserForm propsFormData={{}} userId={0} />      
      <Link href={`/users`}>Back to users list</Link>
    </div>
  );
}
