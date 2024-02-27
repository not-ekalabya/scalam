'use client'
import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Image(props: { onChange: Function, value: any, write: boolean }) {

    const [value, setValue] = React.useState(props.value)
    React.useEffect(() => {
        props.onChange(value)
    }, [value])

    return (
        <div className='overflow-hidden w-full h-full'>
            {
                props.write ?
                    <Dialog>
                        <DialogTrigger className='flex justify-center items-center h-full'>
                            <div>
                                <img className='w-full h-full max-h-[50%] rounded-lg' src={value} alt="Image" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className='max-w-96 max-h-screen no-scrollbar overflow-auto'>
                            <DialogHeader>
                                <input defaultValue={value} onChange={(e) => { setValue(e.target.value) }} placeholder='The title goes here...' className='mt-4 text-justify block  placeholder:text-gray-500 p-2 rounded-lg border-0 w-full resize-none text-gray-900 bg-transparent border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:bg-gray-900/50 dark:focus:border-0 focus:outline-none focus:ring-0 focus:border-0 peer' />
                            </DialogHeader>
                            <DialogDescription>
                                <img onError={(e) => {
                                    setValue('https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=')
                                }} className='rounded-lg' src={value} alt="Image" />
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                    :
                    <Dialog>
                        <DialogTrigger className='flex justify-center items-center h-full'>
                            <div>
                                <img className='w-full h-full max-h-[50%] rounded-lg' src={value} alt="Image" />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogDescription className='mt-4'>
                                    <img className='w-full h-full rounded-lg' src={value} alt="Image" />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
            }
        </div>
    )
}