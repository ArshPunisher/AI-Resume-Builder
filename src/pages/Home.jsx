import Navbar from '@/components/Custom/Navbar'
import React from 'react'
import bgHome from '../assets/imgs/bg-home.svg'
import vector from '../assets/imgs/bg-vector.svg'

function Home() {
  return (
    <>
      <Navbar scrolled="fixed bg-[#f8c7c8] shadow-md" notScrolled="fixed"/>
      <div className="bg-cover bg-center min-h-screen flex items-center justify-center" style={{ backgroundImage: `url(${bgHome})` }}>
        <div className='w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-[3rem]'>
          <div className='order-2 md:order-1 flex flex-col justify-center text-left md:pl-[2rem] lg:pl-[4rem]'>
            <h1 className='text-[1.5rem] md:text-[3rem] font-bold mb-4'>Welcome to the Future of Resume Building with<span className='text-[#8468f5]'> AI</span></h1>
            <p className='text-[0.8rem] md:text-[1rem] text-gray-800'>Our advanced AI technology simplifies resume creation, helping you craft a polished, personalized resume that stands out. Start building your future today with ease and confidence.</p>
          </div>
          <div className='order-1 md:order-2 flex justify-center'>
            <img src={vector} alt="AI Resume Builder" className='max-w-full h-auto'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
