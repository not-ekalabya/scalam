'use client'
import * as React from 'react';

export default function Text(props: { value: any, onChange: Function, write: boolean }) {

    const textRef = React.useRef<any>(null);
    const [value, setValue] = React.useState(props.value);

    React.useEffect(() => {
        props.onChange(value);
        if (props.write) {
            textRef.current.style.height = 'auto';
            textRef.current.style.height = textRef.current.scrollHeight + 'px';
        }
    }, [value]);

    React.useEffect(() => {
        if (props.write) {
            textRef.current.style.height = 'auto';
            textRef.current.style.height = textRef.current.scrollHeight + 'px';
        }
    }, [props.write]);

    return (
        <div>
            {
                props.write ?
                    <textarea onChange={(e) => {
                        setValue(e.target.value)
                    }} defaultValue={props.value} placeholder='Fill this text block with some text. Write your thoughts...' className='block rounded-lg placeholder:text-gray-500 p-2 border-0 w-full h-auto resize-none text-gray-900 bg-transparent border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-0 focus:outline-none focus:ring-0 no-scrollbar focus:border-0 text-justify peer' ref={textRef} />
                    :
                    <p className='text-justify' style={{ whiteSpace: 'pre-wrap' }}>{props.value}</p>
            }
        </div>
    )

}