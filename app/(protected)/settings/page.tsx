import React from 'react';
import { auth, signOut } from '@/auth';

const Page = async () => {
  const session = await auth();
  return (
    <div>
      Settings Page
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default Page;
