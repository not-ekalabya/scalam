'use client'
import { useParams } from 'next/navigation';
import PageBlock from '@/components/PageBlock';



export default function Page() {
  return <PageBlock id={useParams().id} />
}