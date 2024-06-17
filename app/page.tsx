'use client'
import * as React from 'react';
import Link from 'next/link';
import SignIn from '@/components/SignIn';
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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
        <div className='flex justify-center flex-col p-4 h-screen bg-gradient-to-br from-gray-900 to-gray-950'>

            <div className={`flex items-center`}>
                {
                    auth.currentUser ?
                        <React.Fragment>
                            <Dialog>
                                <DialogTrigger className='flex items-center justify-end w-full'>
                                    <div>
                                        <img src={user.photoURL} className='w-9 h-9 rounded-full' />
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <img src={user.photoURL} className='w-12 h-12 rounded-full' alt="" />
                                            </div>
                                            <div>
                                                <DialogTitle>{user.displayName}</DialogTitle>
                                                <DialogDescription>
                                                    <div>
                                                        <p className='py-1.5'>
                                                            You are awsome. New customization features coming soon.
                                                        </p>
                                                        <button onClick={async () => {
                                                            await auth.signOut();
                                                        }} className='hover:text-red-500'>
                                                            Sign Out
                                                        </button>
                                                    </div>
                                                </DialogDescription>
                                            </div>
                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </React.Fragment>
                        :
                        <SignIn />
                }
            </div>

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