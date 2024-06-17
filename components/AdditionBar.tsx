import * as React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button';

export default function AdditionBar(props: { onChange: Function }) {

    const block: Array<Object> =
        [
            {
                type: 'text-snippit',
                value: ''
            },
            {
                type: "media-snippit",
                value: ``
            },
            {
                type: 'text-block',
                title: '',
                value: ''
            },
            {
                type: 'media-block',
                title: '',
                value: '',
                media: ''
            },
            {
                type: 'list',
                value:
                    [
                        {
                            type: 'text-snippit',
                            style: {
                                background: 'bg-gray-900/40'
                            },
                            value: ''
                        },
                        {
                            type: 'text-block',
                            style: {
                                background: 'bg-gray-900/40'
                            },
                            title: '',
                            value: ''
                        }
                    ]
            },
            {
                type: 'two-segment',
                value:
                    [
                        {
                            type: 'text-block',
                            title: '',
                            value: ''
                        },
                        {
                            type: 'text-block',
                            title: '',
                            value: ''
                        }
                    ]
            }
        ]

    return (
        <Drawer>
            <DrawerTrigger>
                <button className='rounded-sm mb-4 p-2 tracking-wider bg-blue-gray-800/20 hover:bg-blue-gray-800/40 hover:text-blue-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <div className='flex flex-wrap place-content-evenly mb-4 gap-4'>
                    {
                        block.map((item: any, index: number) => {
                            return (
                                <DrawerClose key={index}>
                                    <button onClick={() => {
                                        props.onChange(block[index])
                                    }} className='w-44 hover:bg-blue-700 bg-gray-900 p-2 rounded-lg mt-4'>
                                        {item.type}
                                    </button>
                                </DrawerClose>
                            )
                        })
                    }
                </div>
            </DrawerContent>
        </Drawer>
    );
}