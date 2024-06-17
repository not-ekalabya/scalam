'use client'
import * as React from 'react';
import Compiler from '@/components/Compiler';
import { db } from '@/firebase/config';
import { getDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'next/navigation';
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



export default function Editor() {

  const [user, setUser] = React.useState<any>(null);
  const [id, setId] = React.useState<any>(useParams().id || 'new');
  const [saveDialog, setSaveDialog] = React.useState<any>(false);
  const pageRef = doc(db, "pages", id)

  const defaultData = {
    "title": "Let's Scalam it ...",
    "write": false,
    "image": "https://i.pinimg.com/originals/a2/d9/01/a2d901aa209df00d993291024ddc6c2d.gif",
    "content": [
      {
        "type": "media-block",
        "style": {
          "background": null,
          "default": "row"
        },
        "title": "Here's a quick tutorial... 🚀",
        "value": "Scalam let's you express yourself. Create what makes \"you\", \"you\". Here are some quick steps to get started 😎 -\n \n1. Click \"edit\" from the top right corner to start creating.\n2. You will spot a \"➕\" icon below this block. Click it to add new elements.\n3. Got your new creation? Let's give it some character by changing it's theme from the toolbar at it's top 🎨\n4. Lastly, make it useful  by adding some relevant text or an image. \n5. Let's Click \"save\" from the top-right and share your creation with the world with a single link.\n\nCredits to Kurzgesagt for this beautiful GIF ( plz don't sue us 😥 ) ->",
        "media": "https://media4.giphy.com/media/OcbCi4OcPuqPTHCLR0/source.gif"
      }
    ]
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
        setId(uuidv4())
        const setDefaultData = { ...defaultData, uid: detectuser.uid, id: id }
        setData(setDefaultData);
      })
    } else {
      console.log("sorry, dosen't exist")
    }

  }

  React.useEffect(() => {
    initData();
  }, [])

  React.useEffect(() => {
    console.log(data);
  }, [data])

  const saveFunc = async () => {

    const page = await getDoc(pageRef)
    console.log(data);

    if (page.exists()) {
      setDoc(pageRef, { ...data, id: id })
      setSaveDialog(true);
    } else {
      if (user.uid !== undefined) { // Only add if user is defined

        setData({ ...data, uid: user.uid, id: id })
        await setDoc(doc(db, "pages", id), { ...data, uid: user.uid, id: id });
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
                  await copy(`https://scalam.vercel.app/pages/${id}`);
                } catch (error) {
                  console.error('Failed to copy text to clipboard', error);
                }
                setSaveDialog(false);
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-link mr-2 rounded-sm bg-gray-800 p-1" viewBox="0 0 16 16">
                  <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                  <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
                </svg>
              </button>
              <Link className='text-blue-500 underline' href={`https://scalam.vercel.app/pages/${id}`}>https://scalam.vercel.app/pages/{id}</Link>
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