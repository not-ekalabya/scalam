'use client'
import * as React from 'react';
import Compiler from '@/components/Compiler';
import { db } from '@/firebase/config';
import { getDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from 'next/link';
import copy from 'clipboard-copy';
import {
  Link2 as LinkIcon
} from 'lucide-react';
import { signIn } from './SignIn';



export default function PageBlock(props: { id: any }) {

  const [user, setUser] = React.useState<any>(null);
  const [id, setId] = React.useState<any>(props.id || 'new');
  const [saveDialog, setSaveDialog] = React.useState<any>(false);
  const pageRef = doc(db, "pages", id)

  const defaultData = {
    "title": "Let's Scalam it ...",
    "write": false,
    "image": "https://i.pinimg.com/564x/87/cb/4b/87cb4b51aae4577195f24e61e349762e.jpg",
    "content": [
      {
        "type": "two-segment",
        "value": [
          {
            "type": "list",
            "value": [
              {
                "style": {
                  "background": null
                },
                "type": "text-block",
                "title": "An Introduction",
                "value": "<p><strong>Learning is the best human invention</strong>. That's why we have fire, iPhones, Google and everything cool that exists.  <strong>Scalam Hub</strong> is your one-stop platform to make learning <strong>effective and fun</strong>, for your employees or student, with <s>presentetions</s> <strong>Scalam Pages 😉</strong></p>"
              },
              {
                "style": {
                  "background": null
                },
                "type": "text-block",
                "title": "What is coming...",
                "value": "<p>Here's what you can expect from future Scalam,</p><ul><li><p><strong>AI is coming</strong> with the goal of creating a course within <strong>under 60 seconds. </strong></p></li><li><p>More customization options</p></li><li><p>A course marketplace</p></li><li><p>New Collaboration features</p><p>Of course we are <strong>open to suggestions</strong> 😀</p><p></p></li></ul><p></p>"
              }
            ],
            "style": {
              "background": null,
              "style": "number"
            }
          },
          {
            "type": "media-block",
            "style": {
              "background": null
            },
            "title": "How to get started ...",
            "value": "<p>Let's have a quick start and figure stuff out along the way.</p><ol class=\"\"><li><p>On the top is the Navbar. Here you will find useful commands like, Edit, Save or Delete. <strong>Click on Edit</strong> to start modifying the page.</p></li><li><p>Use the \" + \" sign to add new blocks. This is where creativity shines ✨</p></li><li><p>Make your page functional by filling the block in with some content. Make tweaks and <strong>don't forget media</strong> ( Ex - photos, videos ) makes your page 10x engaging.</p></li><li><p>Click on Save from the Navbar to launch your page on the web and <strong>share it with a single link</strong>.</p></li></ol>",
            "media": "https://mir-s3-cdn-cf.behance.net/project_modules/hd/5eeea355389655.59822ff824b72.gif"
          }
        ]
      }
    ],
  }

  const [data, setData] = React.useState<any>(defaultData)

  const initData = async () => {

    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      }
    });

    if ((await getDoc(doc(db, "pages", id))).exists()) {
      await setData({ ...(await getDoc(doc(db, "pages", id))).data(), id: id }); // Add uid to data
    } else if (id === "new") {
      await onAuthStateChanged(auth, async (detectuser: any) => {
        if (detectuser) {
          setId(uuidv4())
          const setDefaultData = { ...defaultData, uid: detectuser?.uid, id: id, author: user?.displayName }
          setData(setDefaultData);
        } else {
          signIn()
        }
      })
    } else {
      console.log("sorry, dosen't exist")
    }

  }

  React.useEffect(() => {
    console.log(data);
  }, [data])

  React.useEffect(() => {
    initData();
  }, [])

  const saveFunc = async () => {

    const page = await getDoc(pageRef)

    if (page.exists()) {
      setDoc(pageRef, { ...data, id: id, author: user?.displayName })
      console.log(data)
      setSaveDialog(true);
    } else {
      if (user.uid !== undefined) { // Only add if user is defined

        setData({ ...data, uid: user.uid, id: id, author: user?.displayName })
        await setDoc(doc(db, "pages", id), { ...data, uid: user.uid, id: id, author: user?.displayName });
        let userData: any = (await getDoc(doc(db, "user-info", user.uid))).data();

        if (userData.pages) {
          let userPages = userData.pages;
          userPages.push(id)
          // let pushPage = userPages.filter((page: any, index: number) => userPages.indexOf(page));
          console.log(userPages);
          let newUserData = { ...userData, pages: userPages };
          await setDoc(doc(db, "user-info", user.uid), newUserData)
        } else {
          let userPages = [id]
          let newUserData = { ...userData, pages: userPages };
          await setDoc(doc(db, "user-info", user.uid), newUserData)
        }

        setSaveDialog(true);

        console.log("Document written with ID: ", id);

      } else {
        console.error("User not logged in. Cannot add document.");
      }
    }
  }

  const onDelete = async () => {
    if (await (await getDoc(doc(db, "pages", id))).exists()) {
      await deleteDoc(doc(db, "pages", id));
    }

    let userData: any = (await getDoc(doc(db, "user-info", user.uid))).data();
    let userPages = userData.pages;

    userPages.filter((page: any, index: number, array: any) => {
      if (page === id) {
        array.splice(index, 1);
        return true;
      }
      return false;
    });
    console.log(userPages);
    let newUserData = { ...userData, pages: userPages };
    await setDoc(doc(db, "user-info", user.uid), newUserData)

  }


  return (
    <main className='flex flex-col items-center justify-center w-full h-screen' suppressHydrationWarning suppressContentEditableWarning>
      <Dialog open={saveDialog} onOpenChange={setSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Done and dusted !</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p>Share your creation with the world with a single link 👇</p>
            <div className='flex items-center justify-center'>
              <button onClick={async () => {
                try {
                  await copy(`https://scalamhub.com/pages/${id}`);
                } catch (error) {
                  console.error('Failed to copy text to clipboard', error);
                }
                setSaveDialog(false);
              }}>
                <LinkIcon className='w-4 h-4 mr-4' />
              </button>
              <Link className='text-blue-500 underline' href={`https://scalamhub.com/pages/${id}`}>https://scalamhub.com/pages/{id}</Link>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      {
        data.uid ?
          <Compiler onChange={
            (updatedData: any) => {
              setData(updatedData);
            }
          } user={user} data={{ ...data }} onSave={saveFunc} onDelete={onDelete} />
          : <p>loading...</p>
      }
    </main>
  );

}