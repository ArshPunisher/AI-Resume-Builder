import Navbar from '@/components/Custom/Navbar'
import { SignIn, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate } from 'react-router-dom';

function Auth() {
  const {isSignedIn, isLoaded} = useUser()

  if (isSignedIn) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
    <Navbar scrolled="sticky shadow-md" notScrolled="sticky shadow-md"/>
    <div className='flex items-center justify-center my-8'>
      <SignIn/>
    </div>
    </>
  )
}

export default Auth
