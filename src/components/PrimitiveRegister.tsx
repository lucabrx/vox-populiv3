"use client"

import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegisterSchema, UserRegisterType } from '@/schema/user.schema';
import axios from 'axios';

interface PrimitiveRegisterProps {
  
}

const PrimitiveRegister: FC<PrimitiveRegisterProps> = ({}) => {

    const {handleSubmit,reset, register} = useForm<UserRegisterType>({
        resolver: zodResolver(UserRegisterSchema)
    })
    const onSubmit = (data: UserRegisterType) => {
        axios.post('/api/user/register', data)
        console.log(data)
        reset()
    }
  return (
<form 
className='flex gap-2 flex-col'
onSubmit={handleSubmit(onSubmit)}> 
<input placeholder='nm' {...register("name")} />
<input placeholder='em' {...register("email")}/>
<input placeholder='pw' {...register("password")}/>
<input placeholder='pwc' {...register("passwordConfirmation")}/>
<button type="submit">submit</button>
</form>
)
}

export default PrimitiveRegister