"use client"
import { type FC } from 'react';
import EmptyState from '../helpers/EmptyState';
import  useLoginModal  from '@/hooks/useLoginModal';

interface EmptyToSignInProps {
  
}

const EmptyToSignIn: FC<EmptyToSignInProps> = ({}) => {
  const loginModal = useLoginModal()


  return (
<EmptyState 
title="You are not logged in"
subtitle="You need to be logged in to view this page"
action={loginModal.open}
actionLabel="Sign in"
/>
)
}

export default EmptyToSignIn