'use client';

import UserInfo from '@/components/user-info';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import React from 'react';

const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      <UserInfo user={user} label="&#x1f4f1; Client Component" />
    </div>
  );
};

export default ClientPage;
