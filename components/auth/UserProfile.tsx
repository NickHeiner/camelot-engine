'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

export function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Image
          src={user.imageUrl}
          alt={user.firstName || 'User'}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium">User ID</p>
          <p className="text-muted-foreground">{user.id}</p>
        </div>
        <div>
          <p className="font-medium">Created</p>
          <p className="text-muted-foreground">
            {new Date(user.createdAt!).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
