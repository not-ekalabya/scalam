'use client'
import * as React from 'react';
import Title from './extensions/Title';
import Text from './extensions/Text';
import Toolbar from '../Toolbar';
import Media from './extensions/Media';

export default function MediaBlock(props: { data: any, write: any, nested: boolean } | any) {

    const [text, setText] = React.useState(props.data.value);
    const [title, setTitle] = React.useState(props.data.title);
    const [media, setMedia] = React.useState(props.data.media);
    const [style, setStyle] = React.useState<any>(props.data.style ? props.data.style : {
        background: null,
    })

    React.useEffect(() => {
        const exportData = {
            id: props.data.id,
            type: 'media-block',
            style: style,
            title: title,
            value: text,
            media: media
        }
        props.onChange(exportData)
    }, [text, title, media, style])

    React.useCallback(() => {
        setStyle(props.data.style ? props.data.style : {
            background: null,
        })
        setTitle(props.data.title)
        setText(props.data.value)
        setMedia(props.data.media)
    }, [props.data])

    return (
        <div>
            {
                props.write ?
                    <div>
                        <Toolbar data={style} onChange={async (event: any) => {
                            event === 'delete' ? props.onChange({
                                id: props.data.id,
                                value: null,
                            }) : setStyle(event);
                        }} type='media-block' />
                    </div> : null
            }
            <div className={`p-4 flex gap-4 bg-${style.background} justify-center flex-col lg:flex-${style.default} md:flex-${style.default} sm:flex-col rounded-lg`}>
                <div className='flex-1 h-full min-w-[60%] overflow-auto no-scrollbar'>
                    <Title onChange={(event: any) => { setTitle(event) }} value={title} write={props.write} />
                    <Text onChange={(event: any) => { setText(event) }} value={text} write={props.write} />
                </div>
                <div>
                    <Media onChange={(event: any) => {
                        setMedia(event);
                        console.log(event);
                    }} value={media} write={props.write} />
                </div>
            </div>
        </div>
    )
}