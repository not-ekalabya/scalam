'use client'
import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import parse from 'html-react-parser';
import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';


export default function Media(props: { onChange: Function, value: any, write: boolean }) {
    const [value, setValue] = React.useState(props.value);
    const [isError, setIsError] = React.useState(false);
    React.useEffect(() => {
        if (props.write) {
            props.onChange(value);
        }
    }, [value]);

    return (
        <>
            {
                props.write ?
                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className='absolute rounded-tl-lg rounded-br-lg bg-gray-900 hover:bg-gray-950/75 p-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <p>
                                        Change Embed Link
                                        {/* <br /> 
                                        <p className='text-sm text-white/40'>
                                            {`Note - use an <iframe> for videos`}
                                            <br />
                                            <Link className='text-white/75' href={'/'} >learn more</Link>
                                        </p> */}
                                    </p>
                                </DialogHeader>
                                <input defaultValue={value} onChange={(e) => {
                                    setIsError(false);
                                    setValue(e.target.value)
                                }
                                } placeholder='The title goes here...' className='mt-4 text-justify block  placeholder:text-gray-500 p-2 rounded-lg border-0 w-full resize-none text-gray-900 bg-transparent border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:bg-gray-900/50 dark:focus:border-0 focus:outline-none focus:ring-0 focus:border-0 peer' />
                                {
                                    isAbsoluteUrl(value) ?
                                    (isError ?
                                        <iframe allowFullScreen height="100%" src={value}></iframe> :
                                        <img width="100%" height="100%" src={value} onError={() => setIsError(true)} ></img>) :
                                        parse((value).replace('<iframe', '<iframe class="w-full h-full border-0 focus:border-0 rounded-lg aspect-video"').replace('width="853"', 'width="100%"').replace('height="480"', 'height="100%"'))
                                }
                            </DialogContent>
                        </Dialog>
                    </div>
                    :
                    null
            }

            <div>
                {
                    isAbsoluteUrl(value) ?
                        (isError ?
                        <iframe allowFullScreen className='w-[500px] h-[281.25px] border-0 focus:border-0 rounded-lg aspect-video' height="100%" src={value}></iframe> :
                        <img width="100%" height="100%" src={value} onError={() => setIsError(true)} ></img>)
                        :
                        parse(value.replace('width="853" height="480"', 'width="500" height="281.25"'))
                }
            </div>
        </>
    )
}