import React from 'react'

import ListAllCompany from '@/components/ListAllCompany';
const AllCompany = async() => {

  const DB_HOST = process.env.DB_HOST;
console.log("DB_HOST.....")
console.log(DB_HOST)
  return (
    <div>
      <ListAllCompany />
    </div>
  )
}

export default AllCompany
