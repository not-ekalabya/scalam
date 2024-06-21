'use client'
import * as React from 'react';
import Link from 'next/link';
import Navbar from '@/components/native/Navbar';

export default function Home() {

    return (
        <div className='flex justify-center flex-col p-4 h-screen bg-gradient-to-br from-gray-900 to-gray-950'>

            <Navbar/>

            <div className='flex flex-col items-center justify-center w-full h-full'>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-5xl font-extrabold flex font-mono'>Build your  <span className='ml-2.5 text-red-500 uppercase'>ideas.</span> </p>
                    <p className='my-2 text-white/50'>Articles, lessons, blogs and more. Embeds coming soon !</p>
                    <Link href={'/pages/new'}>
                    <button className='rounded-lg py-1 px-3 h-full tracking-wider bg-blue-gray-800/20 hover:bg-blue-gray-800/40 hover:text-red-500'>Get Started</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}