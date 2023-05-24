"use client"
import { useState, type FC, useEffect, type ReactNode } from 'react';

interface HydrateProps {
  children: ReactNode;
}

const Hydrate: FC<HydrateProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if(!hasMounted){
        return null;
    }
  return (
<> 
{children}
</>
)
}

export default Hydrate