import { type FC } from 'react';
import IconContainer from '../ui/IconContainer';
import { Search } from 'lucide-react';

interface SearchProps {
  
}

const SearchInput: FC<SearchProps> = ({}) => {
  return (
<div className='flex pl-3 rounded-md bg-zinc-300/30 dark:bg-zinc-700/30 justify-between shadow-sm px0:mr-2 w-full md:w-auto'> 
<input 
className="w-full bg-transparent outline-none"
type="text" 
placeholder='Search...'
/>
<IconContainer art="solid" className='rounded-l-[0px] h-[36px] w-[36px]'>
<Search size={24} className='dark:text-my-neutral-50' />
</IconContainer>
</div>
)
}

export default SearchInput