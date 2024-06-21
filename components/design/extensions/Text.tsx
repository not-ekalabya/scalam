'use client'
import * as React from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './TextBar';
import parse from 'html-react-parser';
import OrderedList from '@tiptap/extension-ordered-list';

export default function Text(props: { value: any, onChange: Function, write: boolean }) {

    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            OrderedList.configure({
                HTMLAttributes: {
                    class: ''
                }
            }),
        ],
        content: props.value,
        editorProps: {
            attributes: {
                class: 'text-white border-0 rim-0 focus:ring-0 focus:border-0 focus:outline-none'
            }
        },
        onUpdate({ editor }) {
            props.onChange(editor.getHTML())
        }
    })

    return (
        <div>
            {
                props.write ?
                    <div className='prose prose-invert'>
                        <div className='my-4'>
                            <Toolbar editor={editor} />
                        </div>
                        <EditorContent editor={editor} />
                    </div>
                    :
                    <div className='prose prose-invert'>
                        {parse(props.value)}
                    </div>
            }
        </div>
    )

}