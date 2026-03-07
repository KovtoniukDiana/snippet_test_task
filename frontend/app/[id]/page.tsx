'use client'
import React,{ useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import { Snippet } from '@/src/types/snippet';
import { getSnippet } from '@/src/lib/snippets.api';


export default function SnippetPage() {

    const { id } = useParams();
    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!id) return;

        const snippetId = Array.isArray(id) ? id[0] : id;

        getSnippet(snippetId)
        .then(setSnippet)
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, [id]);



  return (
    <div className='h-screen bg-blue-100 flex flex-col items-center pt-17'>
      {
        snippet && 
        <div className='w-[85%] bg-white rounded-lg shadow-lg flex flex-col gap-4 p-4'>
            <div className='w-full flex justify-between'>
                <p className="text-2xl font-bold">{snippet.title}</p>

                <div className='w-fit flex gap-2 cursor-pointer'>
                    <span>Редагувати</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </div>
            </div>


            <div className="flex gap-2 flex-wrap">
            {Array.isArray(snippet.tags) && snippet.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {tag}
                </span>
            ))}
            </div>
            <p className="text-gray-500 mt-2">Тип: {snippet.type}</p>
            <p className="text-gray-400 text-sm">
            Створено: {new Date(snippet.createdAt).toLocaleString()}
            </p>
            <p className="mt-2 text-lg">{snippet.content}</p>
        </div>
      }
    </div>
  )
}
