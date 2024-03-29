'use client'
import * as React from 'react';
import Text from './extensions/Text';
import Toolbar from '../Toolbar';

export default function TextSnippit(props: { data: any, write: boolean, nested: boolean } | any) {

  const [value, setValue] = React.useState(props.data.value);
  const [style, setStyle] = React.useState<any>(props.data.style ? props.data.style : {
    background: null,
  })

  React.useEffect(() => {
    const exportData = {
      id: props.data.id,
      type: 'text-snippit',
      style: style,
      value: value,
    }
    props.onChange(exportData)
  }, [value, style]);

  React.useCallback(() => {
    setValue(props.data.value)
    setStyle(props.data.style)
  }, [props.data])


  return (
    <div className={`p-4 bg-${style.background}`}>
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
      <Text onChange={(event: any) => setValue(event)} value={value} write={props.write} />
    </div>
  )
}