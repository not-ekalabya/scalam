'use client'
import * as React from 'react';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import SignIn from '@/components/SignIn';
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {

    const [user, setUser] = React.useState<any>(null);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    })

    return (
        <main className='flex flex-col m-4'>

            <div className='flex gap-4 flex-col-reverse lg:flex-row xl:lg:flex-row h-fit'>
                <div className='bg-red-900 p-4 rounded-lg h-full 2xl:w-3/5 lg:w-3/5 w-full'>

                    <p className='text-3xl sm:text-3xl md:text-5xl lg:text-5xl font-extrabold'>Scalam Editor</p>

                    <div>
                        <Link href='/project'>
                            <button className='flex justify-between items-center gap-2 w-full text-left p-4 mt-4 font-bold text-xl rounded-lg bg-red-600 hover:bg-red-800 transition-colors duration-300 ease-in-out text-white shadow-lg'>
                                <p>Get Started</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                </svg>
                            </button>
                        </Link>
                    </div>

                </div>

                <div className={`flex items-center bg-gradient-to-br from-indigo-500 p-4 rounded-lg 2xl:w-2/5 lg:w-2/5 w-full ${auth.currentUser ? null : 'border-4 border-spacing-0 border-white'}`}>
                    {
                        auth.currentUser ?
                            <React.Fragment>
                                <img src={user.photoURL} className='w-32 h-32 rounded-full' alt="" />
                                <p className='text-center w-full m-auto text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold'>{user.displayName}</p>
                            </React.Fragment>
                            :
                            <SignIn />
                    }
                </div>

            </div>

            <div className='flex gap-4 flex-col lg:flex-row xl:lg:flex-row mt-4 h-full'>

                <div className='rounded-lg 2xl:w-3/5 lg:w-3/5 w-full'>
                    <div className='bg-gray-900 p-4 rounded-lg text-2xl font-extrabold'>
                        <p className='flex items-center'>Projects<span className='mx-4 p-2 rounded-lg bg-gray-800 font-medium text-base'>coming soon</span></p>
                    </div>
                    <div className='flex flex-col lg:flex-row xl:lg:flex-row 2xl:flex-row gap-4 mt-4 p-4 rounded-lg bg-gray-900 text-2xl '>
                        <Link className='lg:w-1/2 xl:w-1/2 w-full' href={'/'}>
                            <Card className='w-full'>
                                <CardHeader>
                                    <CardTitle>Formation of Geodes</CardTitle>
                                    <CardDescription>8 days ago</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img className='w-full max-h-52 object-cover aspect-video' src="https://i.pinimg.com/originals/23/95/54/2395544bff0ddf8217c28c645cf604e5.gif" alt="Cover Image" />
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href={'/'} className='lg:w-1/2 xl:w-1/2 w-full'>
                            <Card className='w-full'>
                                <CardHeader>
                                    <CardTitle>Formation of Fold Mountains</CardTitle>
                                    <CardDescription>2 weeks ago</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img className='w-full max-h-52 object-cover aspect-video' src="https://i.pinimg.com/originals/2f/10/ce/2f10ce69b96c0611989308b0abc68e70.gif" alt="Cover Image" />
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>

                <div className='flex items-center justify-center min-h-60 bg-gray-900 p-4 rounded-lg 2xl:w-2/5 lg:w-2/5 w-full'>
                    <span className='mx-4 p-2 rounded-lg bg-gray-800 font-medium text-xl'>coming soon</span>
                </div>

            </div>

        </main>
    );
}