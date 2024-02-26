'use client';

import { admin } from '@/action/admin';
import RoleGate from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-seccess';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useCurrentRole from '@/hooks/useCurrentRole';
import { UserRole } from '@prisma/client';
import React from 'react';
import { toast } from 'sonner';

const AdminPage = () => {
  const [pending, startTransition] = React.useTransition();
  function onApiRouteClick() {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast.success('Allowed API route');
      } else {
        toast.error('Forbidden API route');
      }
    });
  }

  async function onServerActionClick() {
    startTransition(async () => {
      const data = await admin();
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">&#128273; Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="ONLY ADMINS CAN SEE THIS" />
        </RoleGate>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to Test</Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button disabled={pending} onClick={onServerActionClick}>
            Click to Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
