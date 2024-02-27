'use client'
import * as React from 'react';
import Converter from '../Converter';
import AdditionBar from '../AdditionBar';
import Toolbar from '../Toolbar';

export default function List(props: { data: any, write: boolean, onChange: Function } | any) {

    const [list, setList] = React.useState<any>(props.data);
    React.useEffect(() => {
        props.onChange(list)
        console.log(list.style)
    }, [list])
    React.useEffect(() => {
        if (!list.style) {
            const style = {
                background: null,
                style: 'number'
            }
            setList({ ...list, style: style })
        }
    }, [])
    return (
        <>
            <div>
                {
                    props.write ?
                        <div>
                            <Toolbar data={list.style} onChange={async (event: any) => {
                                event === 'delete' ? props.onChange({
                                    id: props.data.id,
                                    value: null,
                                }) : setList({ ...list, style: event });
                            }} type='list' />
                        </div> : null
                }
                <div className={`bg-gray-900/20 p-4 flex flex-col gap-4 rounded-lg shadow-2xl`}>
                    {
                        list.value.map((item: any, index: number) => {
                            return (
                                item ?
                                    <div className='flex items-center'>
                                        {
                                            list.style?.style !== 'none' ?
                                                list.style?.style === 'number' ?
                                                    <p className='mr-4 text-2xl font-bold '>{index + 1}</p>
                                                    : <div className='mr-4 h-4 w-4 bg-white rounded-full'></div>
                                                : null
                                        }
                                        <div className='flex-1 bg-gray-900/20 rounded-lg' key={index}>
                                            <Converter key={index} data={item} write={props.write} nested={true} onChange={(event: any) => {
                                                const updatedList = list.value;
                                                event.value === null ?
                                                    updatedList.splice(index, 1)
                                                    : updatedList[index] = event
                                                setList({ ...list, value: updatedList })
                                            }} />
                                        </div>
                                    </div> : null
                            )
                        })
                    }
                    <AdditionBar onChange={(event: any) => {
                        setList({ ...list, value: [...list.value, event] })
                    }} />
                </div>
            </div>
        </>
    )
}