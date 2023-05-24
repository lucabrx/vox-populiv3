"use client"
import { type FC } from 'react';
import { signIn } from 'next-auth/react';
interface SignInProps {
  
}

const SignIn: FC<SignInProps> = ({}) => {
  return (
<button 
onClick={() => signIn('')}
className='bg-red-500 p-2 px-4'> 
    Sign In
</button>
)
}

export default SignIn