'use client';

import { logout } from '@/action/logout';
import React from 'react';

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  return <span onClick={() => logout()}>{children}</span>;
};

export default LogoutButton;
