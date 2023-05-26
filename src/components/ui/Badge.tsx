import { ButtonHTMLAttributes, type FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/classMerge';

const badgeVariants = cva( "h-[24px] px-2 rounded-[4px] text-[12px] font-medium  shadow-sm flex justify-center items-center",
{
    variants: {
        art: {
            Tech: "bg-blue-50 text-blue-500 dark:bg-blue-900 dark:text-blue-300",
            Sport: "bg-green-50 text-green-500 dark:bg-green-900 dark:text-green-300",
            Lifestyle: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
            World: "bg-red-50 text-red-500 dark:bg-red-900 dark:text-red-300",
           
        },
    },
    defaultVariants: {
        art: "Tech",
}
})

interface BadgeProps extends ButtonHTMLAttributes<HTMLDivElement>, 
VariantProps<typeof badgeVariants> {};

const Badge: FC<BadgeProps> = ({art,className,children,...props}) => {
  return (
<div 
{...props} 
className={cn(badgeVariants({art}),className)}
> 
{children}
</div>
)
}

export default Badge