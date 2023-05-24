"use client"
import { UserLoginType } from '@/schema/user.schema';
import { type FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InputProps {
    id: "email"  | "password";
    label: string;
    type?: string;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    register: UseFormRegister<UserLoginType>,
    errors: FieldErrors;
}

const LoginInput: FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    placeholder,
    required,
    register,
    errors,
}) => {
  return (
<div className='w-full flex flex-col justify-center items-start space-y-2 '> 
<label className={`
text-my-neutral-950 dark:text-my-neutral-50 font-semibold
${errors[id] ? 'text-rose-500' : ""}
`}>{label}</label>
<input 
id={id}
disabled={disabled}
{...register(id, { required })}
placeholder={placeholder}
type={type}
className={`
w-full rounded-md  bg-zinc-300/30 dark:bg-zinc-700/30 py-2 px-4 flex outline-none focus:ring-1 focus:ring-my-primary-500
${errors[id] ? "border-rose-500" : "border-neutral-300"} 
${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
`}
/>
{
    errors[id] && (
      <p className='text-rose-500 text-sm'>{String(errors[id]?.message)}</p>
    )
}

</div>
)
}

export default LoginInput