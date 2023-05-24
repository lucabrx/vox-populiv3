"use client"
import { ReactElement, type FC, useState, useEffect, useCallback, forwardRef } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import IconContainer from './IconContainer';

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: ReactElement;
    disabled?: boolean;
    actionLabel: string;
    disableAction?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    loading?: boolean;
}

const ModalMultiAction = forwardRef<HTMLDivElement, ModalProps>(({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
    loading
}, ref) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if(disabled) return;

    onSubmit();
  }, [disabled, onSubmit])

  if(!isOpen) return null;
  
  return (
<div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
<div ref={ref} className='relative w-full md:w-4/6 lg:w-3/6 px0:w-2/6 h-full lg:h-auto md:h-auto mx-auto '>
  {/*content*/}
  <div  className={`translate duration-300 h-full 
    ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div className='translate h-full lg:h-auto md:h-auto  rounded-lg shadow-lg relative flex flex-col w-full bg-my-neutral-50 dark:bg-my-neutral-950 outline-none focus:outline-none'>
           {/* header */}
         <div className='px-8 pt-4 pb-2'>

           <h2 className='text-2xl font-medium'>{title}</h2>
              
                    <IconContainer
                    className='absolute right-2 top-2 cursor-pointer'
                    onClick={handleClose}
                    >
                    <X size={24} />
                    </IconContainer>
                
         </div>
               
            
              {/* body */}
              <div className=' px-8'>
                {body}
            </div>

                    <div className='flex gap-3 justify-end items-center w-full pb-4 px-6'>
                    <Button 
                    art="ghost"
                    className=' w-auto'
                    disabled={disabled}
                    onClick={secondaryAction}
                    >
                    {secondaryActionLabel}
                    </Button> 
                    <Button 
                    art="danger"
                    className='w-auto'
                    disabled={disabled}
                    isLoading={loading}
                    onClick={handleSubmit}
                    >
                    {actionLabel}
                    </Button>
                  

                    
                    </div>
               
              
            </div>

    </div>
  </div>
</div>

)
})
ModalMultiAction.displayName = "ModalMultiAction"
export default ModalMultiAction