'use client'
import * as React from 'react';

export default function Title(props: { onChange: Function, value: any, write: boolean}) {
    const [value, setValue] = React.useState(props.value);
    React.useEffect(() => {
        props.onChange(value);
    }, [value]);
    return (
        <div>
            {
                props.write ?
                <input onChange={(e) => { setValue(e.target.value) }} defaultValue={props.value} placeholder='The title goes here...' className='block  placeholder:text-gray-500 font-bold p-2 text-wrap rounded-lg w-full border-0 resize-none text-2xl text-gray-900 bg-transparent border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:bg-gray-900/50 dark:focus:border-0 focus:outline-none focus:ring-0 focus:border-0 peer' maxLength={100} />
                :
                <h1 className='text-2xl mb-2 font-bold'>{props.value}</h1>
            }
        </div>
    );
}