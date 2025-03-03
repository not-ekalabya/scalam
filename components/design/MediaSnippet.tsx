'use client'
import * as React from 'react';
import Media from './extensions/Media';
import Toolbar from '../Toolbar';

export default function MediaSnippet (props: { data: any, write: boolean, nested: boolean } | any) {

  const [value, setValue] = React.useState(props.data.value);
  const [style, setStyle] = React.useState<any>(props.data.style ? props.data.style : {
    background: null,
  })

  React.useEffect(() => {
    const exportData = {
      id: props.data.id,
      type: 'media-snippit',
      style: style,
      value: value,
    }
    props.onChange(exportData)
  }, [value]);

  React.useCallback(() => {
    setValue(props.data.value);
  }, [props.data]);


  return (
    <div className='h-full w-full'>
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
      <div className='w-full flex justify-center h-full'>
      <Media onChange={(event: any) => {
        setValue(event);
        console.log(event);
      }} value={value} write={props.write} />
      </div>
    </div>
  )
}