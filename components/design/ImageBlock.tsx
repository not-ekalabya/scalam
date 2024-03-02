'use client'
import * as React from 'react';
import Title from './extensions/Title';
import Text from './extensions/Text';
import Image from './extensions/Image';
import Toolbar from '../Toolbar';

export default function ImageBlock(props: { data: any, write: any, nested: boolean } | any) {

    const [text, setText] = React.useState(props.data.value);
    const [title, setTitle] = React.useState(props.data.title);
    const [image, setImage] = React.useState(props.data.image ? props.data.image : 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk=');
    const [style, setStyle] = React.useState<any>(props.data.style ? props.data.style : {
        background: null,
    })

    React.useEffect(() => {
        const exportData = {
            id: props.data.id,
            type: 'image-block',
            style: style,
            title: title,
            value: text,
            image: image
        }
        props.onChange(exportData)
    }, [text, title, image, style])

    React.useCallback(() => {
        setStyle(props.data.style ? props.data.style : {
            background: null,
        })
        setTitle(props.data.title)
        setText(props.data.value)
        setImage(props.data.image)
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
                        }} type='image-block' />
                    </div> : null
            }
            <div className={`p-4 flex gap-4 bg-${style.background} justify-center flex-col lg:flex-${style.default} md:flex-${style.default} sm:flex-col rounded-lg`}>
                <div className='flex-1 h-full min-w-[60%] overflow-auto no-scrollbar'>
                    <Title onChange={(event: any) => { setTitle(event) }} value={title} write={props.write} />
                    <Text onChange={(event: any) => { setText(event) }} value={text} write={props.write} />
                </div>
                <div className='overflow-hidden'>
                    <Image onChange={(event: any) => { setImage(event) }} value={image} write={props.write} />
                </div>
            </div>
        </div>
    )
}