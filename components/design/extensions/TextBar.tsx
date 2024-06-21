'use client'
import { type Editor } from '@tiptap/react'
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    List,
    ListOrdered,
    Code,
    Link,
    Image,
    Heading2
} from 'lucide-react';
import { Toggle } from '../../ui/toggle'


type Props = {
    editor: Editor | null
}

export default function Toolbar({editor}: Props) {
    return (
        <div>
            <Toggle 
            size={'sm'} 
            pressed={editor?.isActive('bold')}
            onPressedChange={() => {
                editor?.chain().focus().toggleBold().run()
            }}
            >
                <Bold className='w-4 h-4' />
            </Toggle>
            <Toggle 
            size={'sm'} 
            pressed={editor?.isActive('italic')}
            onPressedChange={() => {
                editor?.chain().focus().toggleItalic().run()
            }}
            >
                <Italic className='w-4 h-4' />
            </Toggle>
            <Toggle 
            size={'sm'} 
            pressed={editor?.isActive('strike')}
            onPressedChange={() => {
                editor?.chain().focus().toggleStrike().run()
            }}
            >
                <Strikethrough className='w-4 h-4' />
            </Toggle>
            <Toggle 
            size={'sm'} 
            pressed={editor?.isActive('code')}
            onPressedChange={() => {
                editor?.chain().focus().toggleCode().run()
            }}
            >
                <Code className='w-4 h-4' />
            </Toggle>
            <Toggle 
            size={'sm'} 
            pressed={editor?.isActive('bulletList')}
            onPressedChange={() => {
                editor?.chain().focus().toggleBulletList().run()
            }}
            >
                <List className='w-4 h-4' />
            </Toggle>
            <Toggle 
            size={'sm'} 
            pressed={editor?.isActive('orderedList')}
            onPressedChange={() => {
                editor?.chain().focus().toggleOrderedList().run()
            }}
            >
                <ListOrdered className='w-4 h-4' />
            </Toggle>
        </div>
    )
}