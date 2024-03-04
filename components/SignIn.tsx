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
        <button onClick={signIn} >Sign In</button>
    );
}