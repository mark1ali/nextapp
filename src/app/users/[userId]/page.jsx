import Link from 'next/link';
import { Suspense } from 'react';

import { getUser } from '@/lib/allRoutes';

export default async function UserPage({ params }) {
  const { userId } = params;
  // Fetch user data from the API route
  const user = await getUser(userId);
  const userData = user[0];
  console.log(userData)
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserDetails user={userData} />
      </Suspense>
      <br></br>
      <Link href={`/users`}>Back to users page</Link>
    </div>
  );
}

function UserDetails({ user }) {
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user.id}</p>
    </div>
  );
}
