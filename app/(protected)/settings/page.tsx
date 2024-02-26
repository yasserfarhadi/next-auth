'use client';

import { logout } from '@/action/logout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import React from 'react';

const Page = () => {
  const user = useCurrentUser();
  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="button" onClick={() => logout()}>
        Sign out
      </button>
    </div>
  );
};

export default Page;
