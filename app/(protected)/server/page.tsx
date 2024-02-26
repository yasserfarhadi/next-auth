import UserInfo from '@/components/user-info';
import { currentUser } from '@/lib/auth';
import React from 'react';

const ServerPage = async () => {
  const user = await currentUser();

  return (
    <div>
      <UserInfo user={user} label="&#128187; Server Component" />
    </div>
  );
};

export default ServerPage;
