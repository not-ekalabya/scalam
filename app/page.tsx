'use client'
import * as React from 'react';
import Link from 'next/link';
import Navbar from '@/components/native/Navbar';

export default function Home() {

    return (
        <div className='flex justify-center flex-col p-4 h-screen bg-gradient-to-br from-gray-900 to-gray-950'>

            <Navbar />

            <div className='flex flex-col items-center justify-center w-full h-full'>
                <div className='flex flex-col items-center justify-center'>
                    <div>

                        <p className='text-5xl font-extrabold flex font-mono'>Discover <span className='ml-2.5 text-purple-500 lowecase'>courses...</span> </p>
                        <p className='text-3xl font-extrabold flex font-mono'>or create your <span className='ml-2.5 text-blue-500'>own.</span> </p>
                        <div className='h-8 w-full my-4'>
                            <Link href={'/pages/new'}>
                                <button className='w-full text-left font-bold rounded-lg py-1 px-3 h-full tracking-wider bg-red-500 hover:bg-red-800'>Get Started</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}