"use client"

import { ReactElement, type FC, useState, useEffect, useCallback, forwardRef,  } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import IconContainer from './IconContainer';

interface RegularModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: ReactElement;
    footer?: ReactElement;
    disabled?: boolean;
    actionLabel: string;
    disableAction?: boolean;
}

const RegularModal = forwardRef<HTMLDivElement, RegularModalProps>(({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
},ref) => {
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
<div  className='relative w-full md:w-4/6 lg:w-3/6 px0:w-2/6 h-full lg:h-auto md:h-auto mx-auto '>
<div  className={`translate duration-300 h-full 
    ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div ref={ref} className='translate h-full lg:h-auto md:h-auto  rounded-md shadow-lg relative flex flex-col w-full bg-my-neutral-50 dark:bg-my-neutral-950 outline-none focus:outline-none'>
           {/* header */}
           <div className='flex items-center p-4 rounded-t-md justify-center relative border-b border-my-neutral-200/50 dark:border-my-neutral-700/50'>
              
                    <IconContainer
                    className='absolute right-4 top-3 cursor-pointer'
                    onClick={handleClose}
                    >
                    <X />
                    </IconContainer>
                
                <h2 className='text-xl font-semibold'>
                    {title}
                </h2>
            </div>
              {/* body */}
              <div className='relative flex-auto px-6'>
                {body}
            </div>

                    <Button 
                    className='m-6'
                    disabled={disabled}
                    onClick={handleSubmit}
                    >
                    {actionLabel}
                    </Button>
               
                {footer}
            </div>

    </div>
</div>
</div>
)})
RegularModal.displayName = 'RegularModal'
export default RegularModal