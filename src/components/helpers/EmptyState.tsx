'use client';
import { FC } from "react";
import Button from "../ui/Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  action: () => void;
  actionLabel: string;
}

const EmptyState: FC<EmptyStateProps> = ({title,subtitle,action,actionLabel}) => {
  return ( 
    <div 
      className="h-[60vh] flex flex-col gap-4 justify-center items-center 
      "
    >
     <div className="text-center"> 
    <h2 className='text-2xl font-bold dark:text-neutral-50 text-neutral-950'>
      {title}
    </h2>
    <h3 className='font-light text-neutral-700 dark:text-neutral-200 mt-2'>
      {subtitle}
    </h3>
      </div>
        <Button
         onClick={action}
          >
            {actionLabel}
          </Button>
        
      
    </div>
   );
}
 
export default EmptyState;