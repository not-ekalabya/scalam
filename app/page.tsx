'use client'
import * as React from 'react';
import Head from 'next/head';
import Compiler from '@/components/Compiler';

export default function Home() {
  return (
    <main suppressHydrationWarning suppressContentEditableWarning className='mx-4 sm:mx-4 md:mx-10 lg:mx-48 xl:mx-52 2xl:mx-60'>
      <Head>
        <title>Perfecto Editor</title>
      </Head>
      <Compiler />
    </main>
  );
}
