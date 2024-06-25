'use client'
import React from 'react';
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
} from "@/components/ui/dialog";
import Link from 'next/link';

export default function Navbar() {

    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
    }, [])


    return (
        <div className={`flex items-center justify-between`}>
            <div className='flex items-center justify-between gap-5 font-bold text-white/70'>
                <Link className='hover:text-red-400' href={'/'}>
                    <p>Home</p>
                </Link>
                <Link className='hover:text-red-400' href={'/projects'}>
                    <p>Workspace</p>
                </Link>
            </div>
            <div>
                {
                    auth.currentUser ?
                        <React.Fragment>
                            <Dialog>
                                <DialogTrigger className='flex items-center justify-end w-full'>
                                    <div>
                                        <img src={user?.photoURL} className='w-9 h-9 rounded-full' />
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <img src={user?.photoURL} className='w-12 h-12 rounded-full' alt="" />
                                            </div>
                                            <div>
                                                <DialogTitle>{user?.displayName}</DialogTitle>
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
        </div>
    )
}