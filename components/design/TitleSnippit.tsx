'use client'
import * as React from 'react';
import Title from './extensions/Title';
import Toolbar from '../Toolbar';

export default function TitleSnippit(props: { data: any, write: boolean, nested: boolean } | any) {

    const [value, setValue] = React.useState(props.data.value);
    const [style, setStyle] = React.useState<any>(props.data.style ? props.data.style : {
        background: null,
    })

    React.useEffect(() => {
        const exportData = {
            id: props.data.id,
            type: 'title',
            style: style,
            value: value,
        }
        props.onChange(exportData)
    }, [value, style]);

    return (
        <div className='w-full'>
            {
                props.write ?
                    <div>
                        <Toolbar data={style} onChange={async (event: any) => {
                            event === 'delete' ? props.onChange({
                                id: props.data.id,
                                value: null,
                            }) : setStyle(event);
                        }} />
                    </div> : null
            }
            <Title onChange={(event: any) => setValue(event)} value={value} write={props.write} />
        </div>
    )
}