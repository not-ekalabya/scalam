'use client'
import * as React from 'react';
import TextBlock from '@/components/design/TextBlock';
import MediaBlock from './design/MediaBlock';
import TextSnippit from './design/TextSnippit';
import List from './layout/List';
import TwoSegment from './layout/TwoSegment';
import TitleSnippit from './design/TitleSnippit';
import MediaSnippet from './design/MediaSnippet';

export default function Converter(props: { data: any, write: boolean, nested: boolean } | any) {
    const [data, setData] = React.useState(props.data)
    React.useEffect(() => {
        if (props.data !== data) {
            props.onChange ? props.onChange(data) : null
        }
    }, [data])
    React.useCallback(() => {
        setData(props.data)
    }, [props.data])
    return (
        <div className='shadow-2xl'>
            {
                (() => {
                    switch (props.data.type) {
                        case 'title-snippit':
                            return (<>
                                <TitleSnippit data={props.data} onChange={setData} write={props.write} nested={props.nested} />
                            </>)
                        case 'text-snippit':
                            return (<>
                                <TextSnippit data={props.data} onChange={setData} write={props.write} nested={props.nested} />
                            </>)
                        case 'media-snippit':
                            return (<>
                                <MediaSnippet data={props.data} onChange={setData} write={props.write} nested={props.nested} />
                            </>)
                        case 'text-block':
                            return (<>
                                <TextBlock data={props.data} write={props.write} onChange={setData} nested={props.nested} />
                            </>)
                        case 'media-block':
                            return (<>
                                <MediaBlock data={props.data} onChange={setData} write={props.write} nested={props.nested} />
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