'use client'
import React from 'react'
import Navbar from '@/components/native/Navbar'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { db } from '@/firebase/config';
import { getDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import copy from 'clipboard-copy';

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
                <div className='flex flex-1 flex-row flex-wrap py-2 '>
                    {
                        user && render ?
                            <div className='sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3'>
                                {
                                    userProjects?.map((project: any) => {
                                        return <div className='flex justify-between bg-white/5 rounded-sm p-4 my-4'>
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-link rounded-sm" viewBox="0 0 16 16">
                                                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                                                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    })
                                }
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