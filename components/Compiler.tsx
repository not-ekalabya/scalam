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
import {
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";


export default function Compiler(props: { onSave: Function, data: any }) {

  const [data, setData] = React.useState(props.data);

  const [write, setWrite] = React.useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = React.useState<any>(0);
  const [phase, setPhase] = React.useState<any>({ ...data.content[currentPhase] });

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  React.useEffect(() => {
    setData({ ...data, write: write })
  }, [write])
  React.useEffect(() => {
    const updatedContentList = [...data.content]
    updatedContentList[currentPhase] = phase
    setData({ ...data, content: updatedContentList })
  }, [phase])
  React.useEffect(() => {
    console.log(data)
  }, [data])

  const progressTracker = () => {
    let total = 0;
    let completed = 0;
    data.content.forEach((item: any) => {
      total += 1;
      if (item.checked) {
        completed += 1;
      }
    })
    setProgress(Math.floor((completed / total) * 100))
  }

  return (
    <>
      <Drawer className='bg-gray-950 px-2' placeholder={false} open={isDrawerOpen} onClose={closeDrawer}>
        <div>
          <p className='text-white text-lg font-bold'>{progress}%</p>
          <Progress value={progress} />
        </div>
        <div>
          {
            data.content.map((item: any, index: number) => {
              return (
                <div key={index} className={`flex items-center my-1.5 ${currentPhase === index ? 'bg-blue-800' : 'bg-gray-900'
                  } p-2 text-lg rounded-md w-full text-left text-white font-bold`}>
                  {
                    !write ?
                      <Checkbox className='mr-2 rounded-full' onCheckedChange={(event: any) => {
                        const contentList = data.content;
                        contentList[index].checked = event;
                        setData({ ...data, content: contentList });
                        progressTracker();
                      }} /> : null
                  }
                  <div className='flex justify-between w-full'>
                    <button onClick={() => {
                      setCurrentPhase(index)
                      setPhase({ ...data.content[index] })
                    }}>{item.title}</button>
                    <button onClick={() => {
                      setCurrentPhase(0)
                      const contentList = data.content;
                      contentList.splice(index, 1)
                      setData({ ...data, content: contentList });
                      progressTracker();
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })
          }
          <div>
            <button className='bg-gray-900 p-2 rounded-md text-white text-lg font-bold w-full text-left hover:bg-blue-800' onClick={() => {
              const contentList = data.content;
              contentList.push({
                "title": "New Chapter",
                "checked": false,
                "image": "https://i.pinimg.com/originals/a2/d9/01/a2d901aa209df00d993291024ddc6c2d.gif",
                "content": [

                ]
              })
              setData({ ...data, content: contentList });
              progressTracker();
            }}>
              <div className='flex justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </Drawer>
      <div className={`h-screen ${isDrawerOpen ? 'overflow-hidden' : null}`} suppressHydrationWarning>
        <div className='flex items-center justify-between py-2 w-full mb-16 bg-gray-900'>
          <div>
            <div>
              <IconButton placeholder={false} variant="text" size="lg" onClick={openDrawer}>
                {isDrawerOpen ? (
                  <XMarkIcon className="h-8 w-8 stroke-2 text-white" />
                ) : (
                  <Bars3Icon className="h-8 w-8 stroke-2 stroke-white" />
                )}
              </IconButton>
            </div>
          </div>
          <div>
            {
              write ?
                <button onClick={() => {
                  setWrite(false)
                }} className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 w-48 rounded-lg m-4'>
                  Preview
                </button> : <button onClick={() => {
                  setWrite(true)
                }} className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 w-48 rounded-lg mx-4'>
                  Edit
                </button>
            }
            <button onClick={() => {
              props.onSave(data)
            }} className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 w-48 rounded-lg m-4'>
              Save
            </button>
          </div>
        </div>
        <div className='lg:mx-32 xl:32 2xl:32 mx-[4%]'>
          <div className="relative">
            {
              write ?
                <Dialog>
                  <DialogTrigger className='w-full'>
                    <img className="h-64 brightness-75 w-full object-cover" src={phase.image} alt="Cover image" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>
                      Change Image URL
                    </DialogTitle>
                    <input className='blockplaceholder:text-gray-500 font-bold rounded-lg w-full border-0 no-scrollbar resize-none bg-transparent border-gray-300 appearance-none dark:focus:border-0 focus:outline-none focus:ring-0 focus:border-0 peer text-wrap' defaultValue={data.image} onChange={(event: any) => {
                      setPhase({ ...phase, image: event.target.value })
                    }} />
                    <img className="h-64 brightness-75 w-full object-cover" src={phase.image} alt="Cover image" />
                  </DialogContent>
                </Dialog>
                :
                <img className="h-64 brightness-75 w-full object-cover" src={phase.image} alt="Cover image" />
            }
            <div className="absolute p-4 bottom-0 left-0 w-full flex items-center">
              {
                write ?
                  <input className='blockplaceholder:text-gray-500 font-bold rounded-lg w-full border-0 no-scrollbar resize-none text-4xl bg-transparent border-gray-300 appearance-none dark:focus:border-0 focus:outline-none focus:ring-0 focus:border-0 peer text-wrap' defaultValue={phase.title} onChange={(event: any) => {
                    setPhase({ ...phase, title: event.target.value })
                  }} maxLength={40} /> :
                  <p className="text-white text-left text-4xl font-bold drop-shadow-2xl">{phase.title}</p>
              }
            </div>
          </div>
          <div>
            <div>
              <div>
                {
                  phase.content.map((item: any, index: number) => {
                    return (
                      <div key={index} className='my-4'>
                        <Converter onChange={(event: any) => {
                          const updatedContent = phase.content;
                          if (item.value !== null) {
                            updatedContent[index] = event;
                          } else {
                            updatedContent.splice(index, 1);
                          }
                          setPhase({ ...phase, content: [...updatedContent] })
                        }} data={item} write={write} />
                      </div>
                    );
                  })
                }
              </div>
              <div>
                {
                  write ?
                    (
                      <AdditionBar onChange={(item: any) => setPhase({ ...phase, content: [...phase.content, item] })} />
                    ) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
