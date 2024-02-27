'use client'
import * as React from 'react';
import Converter from './Converter';
import AdditionBar from './AdditionBar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Compiler() {

  const [data, setData] = React.useState<any>({
    "title": "A begginer's guide to AI",
    "image": "https://i.pinimg.com/originals/a2/d9/01/a2d901aa209df00d993291024ddc6c2d.gif",
    "content": [
      {},
      {
        "id": 1,
        "style": {
          "background": "green-900"
        },
        "type": "text-block",
        "title": "Introduction",
        "value": "In today's rapidly evolving professional landscape, the integration of Artificial Intelligence (AI) has become imperative for enhancing efficiency, productivity, and innovation across various industries. AI's significance in professional life is undeniable, as it revolutionizes traditional workflows, automates mundane tasks, and empowers decision-making processes with data-driven insights. Leveraging the best AI tools not only streamlines operations but also unlocks new avenues for growth and competitive advantage. From advanced analytics to natural language processing and machine learning algorithms, these tools offer a spectrum of capabilities tailored to diverse professional needs. This essay explores the importance of AI in professional contexts and highlights some of the best AI tools that professionals can utilize to maximize their productivity and effectiveness."
      },
      {
        "type": "two-segment",
        "value": [
          {
            "type": "image-snippit",
            "value": "https://cdn.dribbble.com/users/214929/screenshots/4967879/ai-loader-opt.gif"
          },
          {
            "type": "list",
            "value": [
              {
                "style": {
                  "background": null
                },
                "type": "text-block",
                "title": "TensorFlow",
                "value": "Developed by Google Brain, TensorFlow is an open-source machine learning framework widely used for various AI applications, including natural language processing, image recognition, and predictive analytics. Its flexibility, scalability, and extensive community support make it a preferred choice for building and deploying AI models."
              },
              {
                "type": "image-block",
                "style": {
                  "background": null,
                  "default": 'col'
                },
                "title": "Chat GPT",
                "value": "ChatGPT is an advanced conversational AI developed by OpenAI, based on the GPT (Generative Pre-trained Transformer) architecture. It is designed to engage in natural and coherent text-based conversations with users on a wide range of topics. Trained on vast amounts of text data from the internet, ChatGPT exhibits a remarkable ability to understand context, generate relevant responses, and maintain engaging dialogues. With its impressive language understanding capabilities, ChatGPT can provide assistance, answer questions, spark creativity, and even simulate human-like conversations, making it a versatile and valuable tool for various applications, including customer support, education, entertainment, and more.",
                "image": "https://raw.githubusercontent.com/gist/vininjr/d29bb07bdadb41e4b0923bc8fa748b1a/raw/88f20c9d749d756be63f22b09f3c4ac570bc5101/programming.gif"
              }
            ],
            "style": {
              "background": null,
              "style": "number"
            }
          }
        ],
        "id": 2,
        "style": {
          "background": null
        }
      }
    ],
    "write": false
  }
  )
  const [write, setWrite] = React.useState<boolean>(false);

  React.useEffect(() => {
    setData({ ...data, write: write })
  })

  React.useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      {
        write ?
          <button onClick={() => {
            setWrite(false)
          }} className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 w-48 rounded-lg my-4'>
            Preview
          </button> : <button onClick={() => {
            setWrite(true)
          }} className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 w-48 rounded-lg my-4'>
            Edit
          </button>
      }
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
                }} maxLength={40} />
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
      <div className='mt-32'>
        {
          data.content.map((item: any, index: number) => {
            return <div key={index} className='my-4'>
              <Converter onChange={(item: any) => {
                let updatedContent = [...data.content];
                if (item.value !== null) {
                  updatedContent[item.id] = item;
                } else {
                  delete updatedContent[item.id];
                }
                setData({ ...data, content: updatedContent })
              }} data={{ ...item, id: index }} write={write} />
            </div>;
          })
        }
      </div>
      <div>
        {
          write ?
            (
              <AdditionBar onChange={(item: any) => setData({ ...data, content: [...data.content, item] })} />
            ) : null
        }
      </div>
    </div>
  );
}