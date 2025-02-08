"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAllCompany,deleteCompanyFromDB } from '@/lib/allRoutes'

const ListAllCompany = ({}) => {
  const [allCompany, setAllCompany] = useState([]);

  
  useEffect(() => {
      // Fetch users from the API
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company`)
        .then((response) => response.json())
        .then((data) => setAllCompany(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
    
    console.log("allCompany test......")
    console.log(allCompany)
    async function deleteCompany(companyId) {
      console.log("companyId.......")
      console.log(companyId)
      const isConfirmed = window.confirm("Are you sure you want to delete this company?");
      if (isConfirmed) {
        const deletedUseerMessage = await deleteCompanyFromDB(companyId);
        setAllCompany((prevList) => prevList.filter((company) => company.id !== companyId));
      }
    }
  return (
    <div className="container">
        <h2>Company List</h2>
        <p><Link href={`/company/add-company`}>Add New Company</Link></p>            
        <table className="table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Total Users</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allCompany.map((company) => (
                <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.totalUsers}</td>
                <td>
                <Link href={`/company/edit-company/${company.id}`} >Edit Company</Link>
                <button onClick={() => deleteCompany(company.id)}>Delete Company</button>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
        <Link href={`/users`}>Jump to Users</Link>
      </div>
  )
}

export default ListAllCompany
