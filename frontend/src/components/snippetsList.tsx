'use client'
import React ,{useState, useEffect} from 'react'
import { Snippet, GetSnippetsResponse } from '../types/snippet'
import { getAllSnippets } from '../lib/snippets.api';
import Link from 'next/link';

export default function SnippetsList() {

    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        getAllSnippets()
        .then(data => setSnippets(data.items))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, []);



    if (loading) return <div className='text-lg'>Loading...</div>;

    if (!loading && snippets.length === 0) return <div>Сніпетів поки немає</div>;

    
  return (
    <div className="flex flex-col gap-5 w-[85%]">
      {snippets.map(snippet => (
        <Link href={`/${snippet._id}`} key={snippet._id}>
            <div className="p-4 border rounded shadow-sm">
                <h3 className="font-bold">{snippet.title}</h3>
                <p>{snippet.content}</p>
                <p className="text-sm text-gray-400">{snippet.type}</p>
            </div>
        </Link>
      ))}
    </div>
  )
}
