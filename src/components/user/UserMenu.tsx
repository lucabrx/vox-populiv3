"use client"
import { useState, type FC, useRef } from 'react';
import IconContainer from '../ui/IconContainer';
import { Key, Settings, UserCog } from 'lucide-react';
import Button from '../ui/Button';

import { useClickOutside } from '@/hooks/useClickOutside';
import useLockOverflow from '@/hooks/useLockOverlfow';
import useChangePasswordModal from '@/hooks/useChangePasswordModal';
import ChangePasswordModal from '../modals/ChangePasswordModal';

interface UserMenuProps {
}

const UserMenu: FC<UserMenuProps> = ({}) => {
 const [showMenu, setShowMenu] = useState(false);
 const userMenuRef = useRef<HTMLDivElement>(null);
const passwordModal = useChangePasswordModal();

function openPasswordModal() {
  setShowMenu(false)
  passwordModal.onOpen()
}



useLockOverflow(showMenu)
useClickOutside(userMenuRef, () => setShowMenu(false))
  return (
<div className='relative'>
<IconContainer 
onClick={() => setShowMenu(!showMenu)}
className='cursor-pointer'>
  <Settings 
  className='text-my-neutral-950 dark:text-my-neutral-50'
  size={24} />
</IconContainer>


{showMenu && (
<div ref={userMenuRef} className='absolute top-10 right-0 bg-white dark:bg-zinc-900 rounded-md shadow-sm p-4 
min-w-[250px] w-full'>
<div className='w-full h-full flex justify-center flex-col items-center gap-2'>


<Button 
art="ghost" 
className='flex justify-between gap-3 items-center w-full'>
<IconContainer art="solid">
    <UserCog size={24} className=' dark:text-my-neutral-50' />
</IconContainer>
<p>Edit Profile</p>
</Button>

<Button 
onClick={openPasswordModal}
art="ghost" 
className='flex justify-between gap-3 items-center w-full bg-z'>
<IconContainer art="solid">
    <Key size={24} className=' dark:text-my-neutral-50' />
</IconContainer>
<p>Change Password</p>
</Button>



</div>
</div>
)}
</div>
)
}

export default UserMenu