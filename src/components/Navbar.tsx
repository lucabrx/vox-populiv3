"use client"
import { type FC } from 'react';
import Logo from './ui/Logo';
import ShouldRender from './helpers/ShouldRender';
import Button from './ui/Button';
import  useLoginModal  from '@/hooks/useLoginModal';
import SearchInput from './ui/SearchInput';
import MobileNavbarItems from './navbar/MobileNavbarItems';

interface NavbarProps {
  session : SafeSession  | null
}

const Navbar: FC<NavbarProps> = ({session}) => {
  const loginModal = useLoginModal()

  

  return (
    <>
<div className='w-full flex justify-center border-b border-my-neutral-200/30 dark:border-my-neutral-700/50 bg-my-neutral-50 dark:bg-my-neutral-950 md:shadow-sm'> 
<div className="pc:max-w-[1128px] max-w-[1128px] lpc:ml-0 px0:ml-[200px] px0:max-w-[1116px] px-4 py-3 flex justify-between px0:justify-end items-center px0:px-0 w-full ">

<div className='px0:hidden'>
  <Logo />
</div>

<MobileNavbarItems />

<div className="hidden px0:flex gap-2 justify-center items-center">
  <SearchInput />
<ShouldRender if={!session}>
<Button
art="cta" 
size="sm" 
onClick={loginModal.open}
>Sign in
</Button>
</ShouldRender>
</div>
</div>
</div>

</>
)
}

export default Navbar