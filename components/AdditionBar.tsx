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
                type: 'image-snippit',
                value: 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='
            },
            {
                type: "video-snippit",
                value: `https://woodpecker.co/blog/app/uploads/2021/03/A-Guide-to-Personalized-Email-Using-Individual-Videos-and-GIFs-blog-15.21.56.gif`
            },
            {
                type: 'text-block',
                title: '',
                value: ''
            },
            {
                type: 'image-block',
                title: '',
                value: '',
                image: ''
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
            <DrawerTrigger className='w-full'>
                <button className='w-full mb-4 hover:bg-blue-700 bg-gray-900 p-2 rounded-lg mt-4'>Add Block</button>
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