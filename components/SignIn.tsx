import * as React from 'react';
import { auth, authProvider } from '@/firebase/config'
import { signInWithPopup } from 'firebase/auth';

export default function SignIn() {
    const signIn = () => {
        signInWithPopup(auth, authProvider);
        const user = auth.currentUser;
        console.log(user);
    }
    return (
        <button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-lg py-2 px-4 h-full text-xl w-full' onClick={signIn} >Sign In</button>
    );
}