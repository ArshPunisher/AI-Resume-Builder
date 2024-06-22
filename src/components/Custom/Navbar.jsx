import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { UserButton, useUser } from '@clerk/clerk-react'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';

function Navbar({ scrolled, notScrolled}) {
    const { user, isSignedIn } = useUser();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(()=>{
        const handleScroll = () =>{
            if(window.scrollY>50){
                setIsScrolled(true);
            }
            else{
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    },[])
    return (
        <div className={`flex ${isScrolled ? scrolled : notScrolled} transition-all justify-between py-[1rem] px-[2rem] md:px-[4rem] w-full`}>
            <a href='/' className='flex items-center justify-center gap-2'>
                <img src={logo} alt="" className='h-[3rem]'/>
                <h1 className='uppercase font-bold'>AI Resume</h1>
            </a>

            {isSignedIn ? (
                <div className='flex items-center gap-6'>
                    <Link to={'/dashboard'}>
                        <Button variant="outline" className="bg-transparent border-black hover:border-white">Dashboard</Button>
                    </Link>
                    <div className='bg-gray-200 border-2 rounded-full px-1.5 pt-1.5'>
                        <UserButton className="p-0 m-0"/>
                    </div>
                </div>
            ) : (
                <div className='flex items-center'>
                    <Link to={'/auth/sign-in'}>
                        <Button>Get Started</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Navbar
