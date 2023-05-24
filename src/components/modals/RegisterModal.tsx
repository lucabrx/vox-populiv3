"use client"
import { useState, type FC, useRef, useCallback } from 'react';
import RegularModal from '../ui/RegularModal';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { UserLoginType, UserRegisterSchema, UserRegisterType } from '@/schema/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useClickOutside } from '@/hooks/useClickOutside';
import useLockOverflow from '@/hooks/useLockOverlfow';
import RegisterInput from './RegisterInput';
import Button from '../ui/Button';
import { Icon } from '../ui/Icon';

interface RegisterModalProps {
  
}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const registerModalRef = useRef<HTMLDivElement>(null);

    const {register,handleSubmit,formState:{errors}, reset} = useForm<UserRegisterType>({
        resolver: zodResolver(UserRegisterSchema)

    })

    const onSubmit: SubmitHandler<UserRegisterType> = (data) => {
        setIsLoading(true);
        axios.post("/api/user/register", data)
        .then(() => {       
            reset()
            toast.success("Account created")
            registerModal.close();
            loginModal.open();
        })
        .catch((res) => {
            toast.error("Email already exists or invalid inputs")
        }
        )
        .finally(() => {
        setIsLoading(false);
        })
        router.refresh();
    }

    const toggle = useCallback(() => {
        registerModal.close();
        loginModal.open();
        }, [loginModal, registerModal])

        useClickOutside(registerModalRef, registerModal.close)
        useLockOverflow(registerModal.isOpen)

    const bodyContent = (
        <div className="flex flex-col space-y-4 mt-2">
        <RegisterInput
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        placeholder='janadoe@example.com'
        />
        <RegisterInput 
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        placeholder='Jana Doe'
        />
        <RegisterInput 
        id="password"
        label="Password"
        placeholder='********'
        disabled={isLoading}
        type="password"
        register={register}
        errors={errors}
        required
        />
        <RegisterInput 
        id="passwordConfirmation"
        label="Confirm Password"
        placeholder='********'
        disabled={isLoading}
        type="password"
        register={register}
        errors={errors}
        required
        />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 p-6 border-t border-my-neutral-200/50 dark:border-my-neutral-700/50'>
            <Button 
            art="google"
             onClick={() => signIn("google")}
             className='flex justify-center items-center gap-4 w-full'
             >
            <Icon.Google />    
            <p>Google</p>
             </Button>
            <Button 
            art="github"
            className='flex justify-center items-center gap-4 w-full'
            onClick={() => signIn("github")}>
            <Icon.Github />
            <p className='text-my-neutral-50 dark:text-my-neutral-50'>
            Github
            </p>
            </Button>
            <div className='text-neutral-700 dark:text-my-neutral-200 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2 justify-center'>
                <p>Already have an account?</p>
                <button
                onClick={toggle}
                className='text-my-neutral-950 dark:text-my-neutral-50 font-semibold cursor-pointer hover:underline'>Login</button>
                </div>
            </div>
        </div>

        
    )
  return (
    <RegularModal
    ref={registerModalRef}
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    onClose={registerModal.close}
    onSubmit={handleSubmit(onSubmit)}
    title="Register"
    actionLabel="Register"
    body={bodyContent}
    footer={footerContent}
    /> 

)
}

export default RegisterModal