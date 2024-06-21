import * as React from 'react';
import { auth, authProvider } from '@/firebase/config'
import { signInWithPopup } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';


export default function SignIn() {
    const signIn = async () => {
        await signInWithPopup(auth, authProvider);
        const user = await auth.currentUser;
        if (user) {
            console.log((await (getDoc(doc(db, 'user-info', user.uid)))).exists());
            if ((await (getDoc(doc(db, 'user-info', user.uid)))).exists()) {
                console.log('user found');
            } else {
                console.log('user added');
                await setDoc(doc(db, 'user-info', user.uid), {
                    "userName": user.displayName,
                    "email": user.email,
                    "pages": []
                });
            }
        } else {
            console.log('early exit');
        }
    }
    return (
        <div className='flex flex-row justify-end items-center w-full'>
            <div>
                <button className='rounded-lg py-1 px-3 h-full text-lg tracking-wider w-32 bg-blue-gray-800/20 hover:bg-blue-gray-800/40 font-bold' onClick={signIn} >Sign In</button>
            </div>
        </div>
    );
}