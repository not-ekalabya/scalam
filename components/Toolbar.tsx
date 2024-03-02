'use client'
import * as React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Toolbar(props: any) {

    const [exportStyle, setExportStyle] = React.useState<any>(props.data);
    const colors = ['red', 'green', 'blue', 'gray', 'amber', 'lime', 'blue', 'indigo', 'violet', 'rose']
    React.useEffect(() => {
        props.onChange(exportStyle)
    }, [exportStyle]);

    return (
        <div className='flex gap-4 bg-gray-900/20 rounded-t-lg p-2'>
            {
                props.type !== 'list' && props.type !== 'two-segment' ?
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                            <button onClick={
                                () => setExportStyle({ ...exportStyle, background: 'bg-gray-900/40' })
                            } className={`bg-gray-900 w-full h-8 rounded-lg px-10 p-2`}></button>
                            {
                                colors.map((item: any, index: number) => {
                                    return (
                                        <div key={index}>
                                            <button onClick={
                                                () => setExportStyle({ ...exportStyle, background: (item + '-800') })
                                            } className={`bg-${item}-800 w-full h-8 rounded-lg px-10 p-2`} ></button>
                                            <button onClick={
                                                () => setExportStyle({ ...exportStyle, background: (item + '-900') })
                                            } className={`bg-${item}-900 w-full h-8 rounded-lg px-10 p-2`}></button>
                                        </div>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select> : null
            }
            {
                props.type === 'list' ?
                    <Select defaultValue='none' onValueChange={(event) => setExportStyle({ ...exportStyle, style: event })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent className='w-48'>
                            <SelectItem value='bullet'>Bullet</SelectItem>
                            <SelectItem value='number'>Number</SelectItem>
                            <SelectItem value='none'>None</SelectItem>
                        </SelectContent>
                    </Select>
                    : null
            }
            {
                props.type === 'list' ?
                    <Select defaultValue={props.data.style} onValueChange={(event) => setExportStyle({ ...exportStyle, style: event })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent className='w-48'>
                            <SelectItem value='bullet'>Bullet</SelectItem>
                            <SelectItem value='number'>Number</SelectItem>
                            <SelectItem value='none'>None</SelectItem>
                        </SelectContent>
                    </Select>
                    : null
            }
            {
                props.type === 'image-block' ?
                    <>
                        <Select defaultValue={props.data.default} onValueChange={(event) => setExportStyle({ ...exportStyle, default: event })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Orientation" />
                            </SelectTrigger>
                            <SelectContent className='w-48'>
                                <SelectItem value='row'>Row</SelectItem>
                                <SelectItem value='col'>Column</SelectItem>
                            </SelectContent>
                        </Select>
                    </> : null
            }
            <button onClick={
                () => props.onChange('delete')
            } className='bg-gray-900 rounded-lg px-10 hover:bg-gray-950 p-2' >Delete</button>
        </div>
    )
}