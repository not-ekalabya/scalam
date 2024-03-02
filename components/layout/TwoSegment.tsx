'use client'
import * as React from 'react';
import Converter from '../Converter';
import AdditionBar from '../AdditionBar';
import Toolbar from '../Toolbar';

export default function TwoSegment(props: { data: any, write: boolean, onChange: Function } | any) {
    const [list, setList] = React.useState<any>(props.data);
    React.useCallback(() => {
        props.onChange(list)
    }, [list])
    React.useEffect(() => {
        const style = list.style ? list.style : {
            background: null,
        }
        setList({ ...list, style: style })
    }, [])

    React.useCallback(() => {
        setList(props.data)
    }, [props.data])

    return (
        <>
            {
                props.write ?
                    <Toolbar data={list.style} onChange={async (event: any) => {
                        event === 'delete' ? props.onChange({
                            id: props.data.id,
                            value: null,
                        }) : setList({ ...list, style: event });
                    }} type='two-segment' /> : null
            }
            <div className='flex justify-center flex-col lg:flex-row md:flex-col sm:flex-col gap-4'>
                {
                    list.value[0] ?
                        <div className='w-auto lg:w-[50%] md:w-auto sm:w-auto' >
                            {
                                <div>
                                    <Converter data={list.value[0]} write={props.write} nested={true} onChange={(event: any) => {
                                        const updatedList = list.value;
                                        event.value === null ?
                                            updatedList[0] = null :
                                            updatedList[0] = event
                                        setList({ ...list, value: updatedList })
                                    }} />
                                </div>
                            }
                        </div>
                        : props.write ?
                            <div className='w-auto lg:w-[50%] md:w-auto sm:w-auto'>
                                <AdditionBar onChange={(event: any) => {
                                    const updatedList = list.value;
                                    updatedList[0] = event
                                    setList({ ...list, value: updatedList })
                                }} />
                            </div> : null
                }
                {
                    list.value[1] ?
                        <div className='w-auto lg:w-[50%] md:w-auto sm:w-auto'>
                            <div>
                                <Converter data={list.value[1]} write={props.write} nested={true} onChange={(event: any) => {
                                    const updatedList = list.value;
                                    event.value === null ?
                                        updatedList[1] = null :
                                        updatedList[1] = event
                                    setList({ ...list, value: updatedList })
                                }} />
                            </div>
                        </div> :
                        props.write ?
                            <div className='w-auto lg:w-[50%] md:w-auto sm:w-auto'>
                                <AdditionBar onChange={(event: any) => {
                                    const updatedList = list.value;
                                    updatedList[1] = event
                                    setList({ ...list, value: updatedList })
                                }} />
                            </div> : null
                }
            </div>
        </>
    )
}