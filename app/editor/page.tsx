'use client'
import * as React from 'react';
import Compiler from '@/components/Compiler';

export default function Editor() {
  return (
    <main suppressHydrationWarning suppressContentEditableWarning>
      <Compiler />
    </main>
  );

}
