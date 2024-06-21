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
    Link2 as LinkIcon,
    PlusIcon as PlusIcon
} from 'lucide-react'

const Page = () => {

    const [user, setUser] = React.useState<any>(null);
    const [userProjects, setUserProjects] = React.useState<any>(null);
    const [render, setRendeder] = React.useState<boolean>(false);

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
                    if (i === projectList.length - 1) {
                        setRendeder(true);
                    }
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
            <div className='flex flex-col flex-1 py-2'>
                <div>
                    <p className='text-4xl font-bold'>Your Projects</p>
                </div>
                <div className='flex flex-1 py-2 '>
                    {
                        user && render ?
                            <div className='flex flex-col flex-1 gap-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3'>
                                {
                                    userProjects?.map((project: any, index: number) => {
                                        return <div key={index} className='flex justify-between hover:text-red-500 bg-white/5 rounded-sm p-4'>
                                            <Link href={'/pages/' + project.id} key={project.id}>
                                                <div className='text-xl font-bold'>
                                                    {project.title}
                                                </div>
                                                <div>
                                                    <p className='text-sm text-white/50'> ID - {project.id} </p>
                                                </div>
                                            </Link>
                                            <div>
                                                <button className='rounded-sm' onClick={async () => {
                                                    try {
                                                        await copy(`https://scalamhub.com/pages/${project.id}`);
                                                    } catch (error) {
                                                        console.error('Failed to copy text to clipboard', error);
                                                    }
                                                }}>
                                                    <LinkIcon className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </div>
                                    })
                                }
                                <Link href={'/pages/new'}>
                                    <div className='w-full flex justify-center bg-white/5 rounded-sm p-4 hover:bg-gray-950'>
                                        <PlusIcon className='w-10 h-10' />
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