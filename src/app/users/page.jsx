// import ListAllUsers from "@/components/ListAllUsers";
// import {  getAllUserWithCompany } from '@/lib/allRoutes';
const UsersList = async () => {
        
    const users = await getAllUserWithCompany();
    console.log("users.....")
    console.log(users)
    return (
    //    <ListAllUsers allUsers={users}/>
    <h1>Users</h1>
    );
}

export default UsersList
