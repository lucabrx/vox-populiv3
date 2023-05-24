import Providers from '@/components/Providers'
import './globals.scss'
import { Inter } from 'next/font/google';
import Hydrate from '@/components/helpers/Hydrate';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { getCurrentSession } from '@/fetching-hooks/getSession';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';


import "react-markdown-editor-lite/lib/index.css";
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vox Populi',
  description: 'Modern News/Blog for Modern People, by Modern People, for Modern People',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentSession() 
  
  return (
    <html lang="en">     
      <body className={inter.className}>
      <Providers>
        <div className='flex flex-col justify-between min-h-screen bg-my-neutral-50 dark:bg-my-neutral-950'>
        <Hydrate>
        <LoginModal />
        <RegisterModal />
        <Navbar session={session} />
        <Sidebar session={session}/>
        </Hydrate>
        <div className='min-h-[calc(100vh-138px)] md:min-h-[calc(100vh-85px)] w-full flex justify-center px0:pl-[210px] lpc:pl-0'>
        <div className='min-h-[calc(100vh-138px)] md:min-h-[calc(100vh-85px)]  w-full max-w-[1186px] px-4 pc:px-6 pc:w-[1186px] flex flex-col items-center justify-start'>
        {children}
        </div>
        </div>
        <Footer />
        </div>    
        </Providers>
      </body>  
    </html>
  )
}
