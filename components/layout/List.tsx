'use client'
import * as React from 'react';
import Converter from '../Converter';
import AdditionBar from '../AdditionBar';
import Toolbar from '../Toolbar';

export default function List(props: { data: any, write: boolean, onChange: Function } | any) {

    const [list, setList] = React.useState<any>(props.data);

    React.useEffect(() => {
        props.onChange(list)
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

    React.useCallback(() => {
        setList(props.data)
    }, [props.data])
    
    return (
        <>
            <div>
                {
                    props.write && props.data.style ?
                        <div>
                            <Toolbar data={list.style} onChange={async (event: any) => {
                                event === 'delete' ? props.onChange({
                                    id: props.data.id,
                                    value: null,
                                }) : setList({ ...list, style: event });
                            }} type='list' />
                        </div> : null
                }
                <div className={`flex flex-col rounded-lg shadow-2xl`}>
                    {
                        list.value.map((item: any, index: number) => {
                            return (
                                item ?
                                    <div className='rounded-lg' key={index}>
                                        <div className={`flex rounded-lg`} key={index}>
                                            {
                                                list.style?.style !== 'none' ?
                                                    <div className={`rounded-full h-fit w-fit mt-5 ${list.style?.style !== 'none' ?
                                                        list.style?.style === 'number' ?
                                                            '' : '' : null
                                                        }`}>
                                                        {
                                                            list.style?.style !== 'none' ?
                                                                list.style?.style === 'number' ?
                                                                    <p className='text-md font-bold'>{index + 1}</p>
                                                                    : <div className='h-2 w-2   bg-white rounded-full'></div>
                                                                : null
                                                        }
                                                    </div> : null
                                            }
                                            <div className='flex-1'>
                                                <Converter key={index} data={item} write={props.write} nested={true} onChange={(event: any) => {
                                                    const updatedList = list.value;
                                                    event.value === null ?
                                                        updatedList.splice(index, 1)
                                                        : updatedList[index] = event
                                                    setList({ ...list, value: updatedList })
                                                }} />
                                            </div>
                                        </div>
                                    </div> : null
                            )
                        })
                    }
                    {
                        props.write ?
                            <AdditionBar onChange={(event: any) => {
                                setList({ ...list, value: [...list.value, event] })
                            }} /> : null
                    }
                </div>
            </div>
        </>
    )
}