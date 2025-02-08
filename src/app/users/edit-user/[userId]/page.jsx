

import EditForm from '@/components/editForm';
import { getUser } from '@/lib/allRoutes';
import { Suspense } from 'react';

export default async function EditUser({ params}) {
  const {userId} = await params;
  console.log("userId....")
  console.log(userId)
  const user = await getUser(userId);
  const userData = user[0];
  console.log(userData)

  

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <Suspense fallback={<div>Loading users list...</div>}>
        <EditForm userData = {userData} userId={userId}/>
      </Suspense>
    </div>
  );
}
