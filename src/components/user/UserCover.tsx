import { useState, type FC } from 'react';
import Image from 'next/image';
import UserMenu from './UserMenu';
import ShouldRender from '../helpers/ShouldRender';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import EditUserModal from '../modals/EditUserModal';


interface UserCoverProps {
    data: SafeSession | null;
    session?: string | null;
}

const UserCover: FC<UserCoverProps> = ({data, session}) => {
  


  return (
<div className='
w-full flex flex-col justify-center items-center space-y-3
md:flex-row md:gap-6 md:justify-start md:space-y-0
'> 
<div className='relative w-32 h-32'>
  <Image 
  fill 
  sizes='100%'
  priority
  src={data?.image || '/avatar-placeholder.jpeg'}
  alt="user"
  className='rounded-full'
  />
</div>
<div className='
flex flex-col items-center justify-center relative
md:items-start 
'>
<div className='flex justify-center items-center gap-0 md:ml-0 ml-5'>
<h2 className='text-my-neutral-950 dark:text-my-neutral-50 text-xl font-bold md:text-2xl select-none'>{data?.name} 
<ShouldRender if={data?.id === session}>
<span className='text-medium text-my-primary-500'>(You)</span> 
</ShouldRender>
</h2>
<UserMenu  />
</div>
<h3 className='text-base text-my-neutral-900 dark:text-my-neutral-200 md:text-lg'>
{data?.email}
</h3>
<ShouldRender if={data?.page}>
<a
href={data?.page!}  
className='text-my-primary-500  text-sm md:text-base hover:underline' 
>{data?.page}</a>
</ShouldRender>

<EditUserModal session={data} />
<ChangePasswordModal session={data} />
</div>
</div>
)
}

export default UserCover