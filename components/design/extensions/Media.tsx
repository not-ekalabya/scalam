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
import {
    Edit3
} from 'lucide-react';


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
                            <DialogTrigger>
                                <button className='p-2 mb-2 w-full bg-gray-900 hover:bg-gray-950/75 rounded-md'>
                                    <Edit3 className='w-4 h-4' />
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