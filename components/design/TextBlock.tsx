'use client'
import * as React from 'react';
import Title from './extensions/Title';
import Text from './extensions/Text';
import Toolbar from '../Toolbar';

export default function TextBlock(props: { data: any, write: false } | any) {

  const [text, setText] = React.useState(props.data.value);
  const [title, setTitle] = React.useState(props.data.title);
  const [style, setStyle] = React.useState<any>(props.data.style ? props.data.style : {
    background: null,
  })

  React.useEffect(() => {
    const exportData = {
      id: props.data.id,
      style: style,
      type: 'text-block',
      title: title,
      value: text
    }
    props.onChange(exportData);
  }, [text, title, style]);

  React.useCallback(() => {
    setStyle(props.data.style ? props.data.style : {
      background: null,
    });
    setTitle(props.data.title);
    setText(props.data.value);
  }, [props.data]);

  return (
    <main>
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
      <div className={`rounded-lg p-4 bg-${style.background}`}>
        <Title onChange={(event: any) => { setTitle(event) }} value={title} write={props.write} />
        <Text onChange={(event: any) => { setText(event) }} value={text} write={props.write} />
      </div>
    </main>
  )
}