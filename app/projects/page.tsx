'use client'
import React from 'react'
import Navbar from '@/components/native/Navbar'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { db } from '@/firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import copy from 'clipboard-copy';
import {
    PlusIcon,
    Link2 as LinkIcon
} from 'lucide-react';

const Page = () => {

    const [user, setUser] = React.useState<any>(null);
    const [userProjects, setUserProjects] = React.useState<any>(null);

    const initData = async () => {

        await onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const projects = await getDoc(doc(db, "user-info", user?.uid));
                const projectList = (projects?.data())?.pages
                console.log(projectList);

                const userProjectArray = [];
                for (let i = 0; i < projectList.length; i++) {
                    const project = await getDoc(doc(db, "pages", projectList[i]));
                    userProjectArray.push(project.data());
                    setUserProjects(userProjectArray);
                }

            } else {
                setUser(null);
            }
        });

    };

    React.useEffect(() => {
        initData();
    }, []);

    return (
        <div className='flex h-screen w-screen flex-col p-4'>
            <Navbar />
            <div className='flex flex-col flex-1 py-16'>
                <div>
                    <p className='text-3xl font-bold'>Your Pages</p>
                </div>
                <div className='flex flex-1 flex-row flex-wrap py-3 '>
                    {
                        user ?
                            <div className='sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3'>
                                {
                                    userProjects?.map((project: any) => {
                                        return <div className='flex justify-between bg-gray-900 rounded-sm p-4 h-24 shadow-2xl hover:text-red-400'>
                                            <div>
                                                <Link href={'/pages/' + project.id} key={project.id}>
                                                    <div className='text-xl font-bold'>
                                                        {project.title}
                                                    </div>
                                                    <div>
                                                        <p className='text-sm text-white/50'> ID - {project.id} </p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div>
                                                <button className='rounded-sm' onClick={async () => {
                                                    try {
                                                        await copy(`https://scalamhub.com/pages/${project.id}`);
                                                    } catch (error) {
                                                        console.error('Failed to copy text to clipboard', error);
                                                    }
                                                }}>
                                                    <LinkIcon className='w-5 h-5' />
                                                </button>
                                            </div>
                                        </div>
                                    })

                                }
                                <Link href={'/pages/new'}>
                                <div className='flex items-center justify-center rounded-sm p-4 h-24 shadow-2xl bg-gray-900 hover:text-red-400'>
                                    <div>
                                            <PlusIcon className='w-10 h-10' />  
                                    </div>
                                </div>
                                </Link>
                            </div>
                            :
                            <div className='flex flex-1 items-center justify-center'>
                                <div>
                                    <p className='text-xl font-bold text-center'>Login to see your projects 😀</p>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Page