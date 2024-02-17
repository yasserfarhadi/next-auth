'use client';

import React from 'react';

import { CardWrapper } from './card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/action/new-verification';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-seccess';

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const onSubmit = React.useCallback(() => {
    if (!token) {
      return setError('Missing Token!');
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success || '');
        setError(data?.error || '');
      })
      .catch((error) => {
        setError('Something Went Wrong!');
      });
  }, [token]);

  React.useEffect(() => {
    let ignore = false;

    async function startSubmit() {
      await new Promise((r) => setTimeout(r));
      if (!ignore) {
        onSubmit();
      }
    }

    startSubmit();

    return () => {
      ignore = true;
    };
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {!success && <FormError message={error} />}
        {!error && <FormSuccess message={success} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
