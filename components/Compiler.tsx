'use client'
import * as React from 'react';
import Converter from './Converter';
import AdditionBar from './AdditionBar';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';


export default function Compiler(props: { onSave: Function, onDelete: Function, data: any, user: any, onChange: Function }) {

  const [data, setData] = React.useState(props.data);
  const [user, setUser] = React.useState<any>(props.user);

  const [write, setWrite] = React.useState<boolean>(false);
  const [permission, setPermission] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props.user) {
      if (data.uid === user?.uid) {
        setPermission(true)
        console.log("user")
      } else {
        setPermission(false)
        console.log("not user")
      }
    } else {
      setUser(null);
      console.log
    }
  }, []);

  React.useEffect(() => {
    props.onChange(data)
  }, [data])

  return (
    <>
      <div className="h-screen w-full" suppressHydrationWarning>

        {

          permission ?

            <div className='flex items-center gap-2 justify-end p-2 w-full mb-16 bg-gray-900'>
              <div>
                {
                  write ?
                    <button onClick={() => {
                      setWrite(false)
                    }} className='rounded-sm py-1 px-3 h-full tracking-wider text-white/40 bg-blue-gray-800/20 w-32 hover:bg-blue-gray-800/40 hover:text-blue-500'>
                      Preview
                    </button> : <button onClick={() => {
                      setWrite(true)
                    }} className='rounded-sm py-1 px-3 h-full tracking-wider text-white/40 bg-blue-gray-800/20 w-32 hover:bg-blue-gray-800/40 hover:text-blue-500'>
                      Edit
                    </button>
                }
              </div>
              <div>
                <button onClick={() => {
                  props.onSave(data)
                }} className='rounded-sm py-1 px-3 h-full tracking-wider text-white/40 bg-blue-gray-800/20 w-32 hover:bg-blue-gray-800/40 hover:text-green-500'>
                  Save
                </button>
              </div>
              <div>
                <button onClick={() => {
                  props.onDelete()
                }} className='rounded-sm py-1 px-3 h-full tracking-wider text-white/40 bg-blue-gray-800/20 w-32 hover:bg-blue-gray-800/40 hover:text-red-500'>
                  Delete
                </button>
              </div>
            </div> : null
        }
        <div className='lg:mx-32 xl:32 2xl:32 mx-[4%]'>
          <div className="relative">
            {
              write ?
                <Dialog>
                  <DialogTrigger className='w-full'>
                    <img className="h-64 brightness-75 w-full object-cover" src={data.image} alt="Cover image" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>
                      Change Image URL
                    </DialogTitle>
                    <input className='blockplaceholder:text-gray-500 font-bold rounded-lg w-full border-0 no-scrollbar resize-none bg-transparent border-gray-300 appearance-none dark:focus:border-0 focus:outline-none focus:ring-0 focus:border-0 peer text-wrap' defaultValue={data.image} onChange={(event: any) => {
                      setData({ ...data, image: event.target.value })
                    }} />
                    <img className="h-64 brightness-75 w-full object-cover" src={data.image} alt="Cover image" />
                  </DialogContent>
                </Dialog>
                :
                <img className="h-64 brightness-75 w-full object-cover" src={data.image} alt="Cover image" />
            }
            <div className="absolute p-4 bottom-0 left-0 w-full flex items-center">
              {
                write ?
                  <input className='blockplaceholder:text-gray-500 font-bold rounded-lg w-full border-0 no-scrollbar resize-none text-4xl bg-transparent border-gray-300 appearance-none dark:focus:border-0 focus:outline-none focus:ring-0 focus:border-0 peer text-wrap' defaultValue={data.title} onChange={(event: any) => {
                    setData({ ...data, title: event.target.value })
                  }} maxLength={40} /> :
                  <p className="text-white text-left text-4xl font-bold drop-shadow-2xl">{data.title}</p>
              }
            </div>
          </div>
          <div>
            <div>
              <div>
                {
                  data.content.length > 0 ?
                    data.content.map((item: any, index: number) => {
                      return (
                        <div key={index} className='my-4'>
                          <Converter onChange={(event: any) => {
                            const updatedContent = data.content
                            data.content[index] = event
                            setData({ ...data, content: updatedContent })
                          }} data={item} write={write} />
                        </div>
                      );
                    })
                    : (
                      <div className='m-4 flex text-white/40'>
                        <p>
                          NOTE-
                        </p>
                        <p>
                          Express yourself with your <span className='font-bold italic'>content</span>. Click <button className='text-red-500 underline' onClick={() => {
                            permission ? setWrite(true) : null
                          }}>here</button> to add some content. You can change between "edit" and "preview" mode from the top-right navbar
                        </p>
                      </div>
                    )
                }
              </div>
              <div>
                {
                  write ?
                    (
                      <div>
                        <AdditionBar onChange={(item: any) => setData({ ...data, content: [...data.content, item] })} />
                      </div>
                    ) : null
                }
              </div>
              <div className='pb-4 pl-4'>
                <p>Author : <span>{user?.displayName}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
