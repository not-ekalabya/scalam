'use client'
import * as React from 'react';
import Image from './extensions/Image';
import Toolbar from '../Toolbar';

export default function ImageSnippit(props: { data: any, write: boolean, nested: boolean } | any) {

  const [value, setValue] = React.useState(props.data.value);
  const [style, setStyle] = React.useState(props.data.style);

  React.useEffect(() => {
    const exportData = {
      id: props.data.id,
      type: 'image-snippit',
      style: style,
      value: value,
    }
    props.onChange(exportData)
  }, [value]);

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
            }} />
          </div> : null
      }
      <Image value={value} onChange={(event: any) => setValue(event)} write={props.write} />
    </div>
  )
}