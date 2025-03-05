import React, { useCallback, useEffect, useMemo, useState, useTransition } from 'react'

const ExampleUseMemo = () => {
    const [ users, setUsers ] = useState([]);
    const [ listUsers, setListUsers ] = useState([]);
    const [ status, setStatus ] = useTransition();
    const [ searchName, setSearchName ] = useState("");
    const [ increment, setIncrement ] = useState(0);

    const getUserData =  useCallback(async() => {
        const totalUsers = await fetch("https://jsonplaceholder.typicode.com/users");
        const allUsersData = await totalUsers.json();
        console.log("allUsersData..");
        console.log(allUsersData);
        setUsers(allUsersData);
        setListUsers(allUsersData);
    },[])

    useEffect(() => {
        
        setStatus(() => {
            getUserData();
        })
        
    },[]);
    
    const handleSearchChange = useMemo(() => {                      
            const searchUser = users.filter((user) => {
                return user.name.toLowerCase().includes(searchName);
            })
            setListUsers(searchUser);         
    },[searchName])

     
    // const handleSearchChange = (event) => {
    //     console.log("searchUser working...")
    //     setSearchName(event.target.value);
    //     const searchUser = users.filter((user) => {
    //         return user.name.toLowerCase().includes(searchName)
    //     })
    //     setListUsers(searchUser)
    // }
  return (
    <div>
      ExampleUseMemo 
      <hr></hr>
      <input type='text' value={searchName}  onChange={(event) => setSearchName(event.target.value)}/>
      {status && <h5>...pnding</h5>}
      {!status && listUsers.map((users,index) => {
        return (
            <li key={index}>{users.name}</li>
        )
      })}
      <button onClick={() => setIncrement(increment + 1)}>Increment</button> ({increment})
    </div>
  )
}

export default ExampleUseMemo
