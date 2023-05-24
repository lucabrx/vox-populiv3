import { ButtonHTMLAttributes, type FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/classMerge';

const iconVariants = cva( "h-[36px] w-[36px] flex justify-center items-center rounded-md",
{
    variants: {
        art: {
            ghost: "bg-transparent transition-all duration-300 hover:bg-zinc-300/50 hover:dark:bg-zinc-500/20",
            themeToggle: "transition-all duration-300 hover:bg-zinc-200/50 hover:dark:bg-zinc-700/40 w-full gap-2 p-2",
            solid: "bg-my-primary-500 transition-all duration-500 text-zinc-100 dark:text-my-neutral-100 h-[28px] w-[28px]"
        }
    },
    defaultVariants: {
        art: "ghost"
}
})

interface IconContainerProps extends ButtonHTMLAttributes<HTMLDivElement>, 
VariantProps<typeof iconVariants> {};

const IconContainer: FC<IconContainerProps> = ({art,className,children,...props}) => {
  return (
<div 
{...props} 
className={cn(iconVariants({art}),className)}
> 
{children}
</div>
)
}

export default IconContainer