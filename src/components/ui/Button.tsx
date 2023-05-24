import { ButtonHTMLAttributes, type FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/classMerge';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva( "rounded-[4px] flex justify-center items-center",
{
    variants: {
        art: {
            cta: "bg-my-primary-500 hover:dark:bg-my-primary-500/80 hover:bg-my-primary-700 transition-all duration-500 text-my-neutral-50 dark:text-my-neutral-100",
            ghost: "hover:bg-zinc-300/50 hover:dark:bg-zinc-500/20 transition-all duration-500 text-my-neutral-950 dark:text-my-neutral-50",
            "google" : "shadow-sm bg-[#fefffe] hover:bg-[#f5f5f5] text-[#111926]",
            "github" : "shadow-sm bg-[#27272a] hover:bg-[#27272a]/70 text-[##fefffe]",
            "danger" : "bg-rose-500 dark:bg-rose-600 hover:dark:bg-rose-500 hover:bg-rose-600 transition-all duration-500 text-my-neutral-50 dark:text-my-neutral-100"

           
        },
        size: {
            sm: "px-4 py-3 font-semibold leading-0 text-base h-[36px]",
            md: "px-6 py-3 font-semibold leading-0 text-base h-[44px]",
            lg: "px-6 py-3 font-semibold leading-0 text-base h-[50px]"
        }
    },
    defaultVariants: {
        art: "cta",
        size: "sm"
}
})

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, 
VariantProps<typeof buttonVariants> {
    isLoading?: boolean

};

const Button: FC<ButtonProps> = ({art,size,className,isLoading,children,...props}) => {
  return (
<button 
{...props} 
className={cn(buttonVariants({art,size}),className)}
> 
{isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
{children}
</button>
)
}

export default Button