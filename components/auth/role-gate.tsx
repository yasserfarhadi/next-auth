import useCurrentRole from '@/hooks/useCurrentRole';
import { UserRole } from '@prisma/client';
import React from 'react';
import { FormError } from '../form-error';

interface Props {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: Props) => {
  const role = useCurrentRole();

  if (role !== allowedRole)
    return (
      <FormError message="You do not have permission to view this content" />
    );
  return <>{children}</>;
};

export default RoleGate;
