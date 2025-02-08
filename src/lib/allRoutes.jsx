  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  export async function getUser(id) {
    const res = await fetch(`${API_BASE_URL}/api/users?id=${id}`);
    
  
    if (!res.ok) {
      throw new Error('User not found');
    }
    
    return res.json(); // Return user data
  }

  export async function deleteUserFromDB(id) {
    const res = await fetch(`/api/users?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      return res.json();
  }

  export async function getAllUser() {
    const res = await fetch(`${API_BASE_URL}/api/users`);      
    if (!res.ok) {
      throw new Error('User not found');
    }
    return res.json(); // Return user data
  }
  export async function getAllUserWithCompany() {
    const res = await fetch(`${API_BASE_URL}/api/users?res=withCompany`);
    if(!res.ok) {
      throw new Error("User not found");
    }
    return res.json();
  }
  export async function getAllCompany() {
    const res = await fetch(`${API_BASE_URL}/api/company`);      
    if (!res.ok) {
      throw new Error('Company not found');
    }
    return res.json(); // Return user data
  }
  export async function getCompany(companyId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/company?id=${companyId}`);
    if (!res.ok) {
      throw new Error('companyId not found');
    }
    return res.json(); // Return user data
  }
  export async function deleteCompanyFromDB(companyId) {
    const res = await fetch(`/api/company?id=${companyId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    return res.json();
  }