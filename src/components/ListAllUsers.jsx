"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { deleteUserFromDB } from '@/lib/allRoutes';
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

const ListAllUsers = ( { allUsers }) => {
  const { themeColor } = useTheme();
  // console.log("allUsers.....")
  // console.log(allUsers)
    const [users, setUsers] = useState(allUsers);

    async function deleteUser(userId) {
      console.log("deleteUser called");
      const isConfirmed = window.confirm("Are you sure you want to delete this user?");
      if (isConfirmed) {
        const deletedUseerMessage = await deleteUserFromDB(userId);
        setUsers((prevList) => prevList.filter((user) => user.id !== userId));
      }
    }

  return (
    <div className="container" style={{ backgroundColor: themeColor, color: "#fff" }}>
        <h2>Users List</h2>
        <p><Link href={`/users/add-user`}>Add New User</Link></p>            
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.companyName}</td>
                <td><Image src={user.profile_path} height={50} width={50} alt="List Image"  className="rounded-lg shadow-lg" unoptimized={true}  /></td>
                <td>
                <Link href={`/users/edit-user/${user.id}`} >Edit User</Link>
                <button onClick={() => deleteUser(user.id)}>Delete User</button>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default ListAllUsers
