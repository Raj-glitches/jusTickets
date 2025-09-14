import React from 'react'
import {assets} from '../assets/assets'
import { ClockIcon, CalendarIcon, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    
    const navigate = useNavigate()

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/animals.jpg")] bg-cover bg-center h-screen '>
        <img src={assets.movielogo} alt="" className='max-h-20 lg:h-20 mt-20' />

        <h1 className='text-5xl md:text-[70px] md:bg-linear-18 font-semibold max-w-110'>Animal</h1>

        <div className='flex items-center gap-4 text-gray-300'>
            <span>Action | Crime | Drama</span>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4.5 h-4.5' /> 2023 
            </div>
            <div className='flex items-center gap-1'>
                <ClockIcon className='w-4.5 h-4.5' /> 3h 21m
            </div>
        </div>
        <p className='max-w-md text-gray-300'>The son of a wealthy, powerful industrialist returns to India and undergoes a remarkable transformation as he becomes consumed by a quest for vengeance against those threatening his father's life.</p>
        <button onClick={()=> navigate('/Movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
            Explore Movies
            <ArrowRight className='w-5 h-5' />
        </button>
    </div>
  )
}

export default Hero