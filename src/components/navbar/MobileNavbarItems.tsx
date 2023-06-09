"use client"
import { useState, type FC, useRef } from 'react';
import SearchInput from '../ui/SearchInput';
import IconContainer from '../ui/IconContainer';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Button from '../ui/Button';
import useLockOverflow from '@/hooks/useLockOverlfow';
import { useClickOutside } from '@/hooks/useClickOutside';
import ShouldRender from '../helpers/ShouldRender';
import MobSidebar from './MobSidebar';
import  useLoginModal  from '@/hooks/useLoginModal';
import useMobileMenu from '@/hooks/useMobileMenu';

interface MobileNavbarItemsProps {
  session: SafeSession | null;
}

const MobileNavbarItems: FC<MobileNavbarItemsProps> = ({session}) => {
  const mobileMenu = useMobileMenu()
  const { setTheme, resolvedTheme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null);
  const loginModal = useLoginModal()

    useLockOverflow(mobileMenu.isOpen);
    useClickOutside(menuRef, mobileMenu.close);

  return (
<div className='flex px0:hidden gap-3 justify-center items-center'>
<div className='hidden md:block px0:hidden'>
<SearchInput />
</div>
<Button
art="cta" 
size="sm" 
onClick={loginModal.open}
>Sign in
</Button>

<IconContainer> 
{
resolvedTheme === 'dark' ? 
<Sun 
size={24}
onClick={() => setTheme('light')} /> 
: 
<Moon 
size={24}
onClick={() => setTheme('dark')} />
}
</IconContainer>

<IconContainer
onClick={mobileMenu.open}>
<Menu size={32} className='text-my-neutral-950 dark:text-my-neutral-50' />
</IconContainer>
<ShouldRender if={mobileMenu.isOpen}>
 
      <MobSidebar 
      session={session}
      disableAction={mobileMenu.close}
      ref={menuRef} />
</ShouldRender>
</div>

)
}

export default MobileNavbarItems