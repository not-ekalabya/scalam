'use client'
import * as React from 'react';
import TextBlock from '@/components/design/TextBlock';
import ImageBlock from './design/ImageBlock';
import TextSnippit from './design/TextSnippit';
import ImageSnippit from './design/ImageSnippit';
import List from './layout/List';
import TwoSegment from './layout/TwoSegment';
import TitleSnippit from './design/TitleSnippit';

export default function Converter (props: { data: any, write: boolean, nested: boolean } | any) {
    const [data, setData] = React.useState(props.data)
    React.useEffect(() => {
        props.onChange ? props.onChange(data) : null
    }, [data])
    return (
        <div className='shadow-2xl'>
            {
                (() => {
                    switch (props.data.type) {
                        case 'title-snippit':
                            return (<>
                                <TitleSnippit data={props.data} onChange={setData} write={props.write} nested={props.nested} />
                            </>)
                        case 'image-snippit':
                            return (<>
                                <ImageSnippit data={props.data} onChange={setData} write={props.write} nested={props.nested} />
                            </>)
                        case 'text-snippit':
                            return (<>
                                <TextSnippit data={props.data} onChange={setData} write={props.write} nested={props.nested} />
                            </>)
                        case 'text-block':
                            return (<>
                                <TextBlock data={props.data} write={props.write} onChange={setData} nested={props.nested} />
                            </>)
                        case 'image-block':
                            return (<>
                                <ImageBlock data={props.data} onChange={setData} write={props.write} nested={props.nested} />
                            </>)
                        case 'list':
                            return (
                                <List data={props.data} write={props.write} nested={props.nested} onChange={setData} />
                            )
                        case 'two-segment':
                            return (
                                <TwoSegment data={props.data} write={props.write} nested={props.nested} onChange={setData} />
                            )
                        default:
                            return null
                    }
                })()
            }
        </div>
    );
}