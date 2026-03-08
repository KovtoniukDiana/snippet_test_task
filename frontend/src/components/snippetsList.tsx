'use client'
import React ,{useState, useEffect} from 'react'
import { Snippet, GetSnippetsResponse } from '../types/snippet'
import { getAllSnippets, deleteSnippet } from '../lib/snippets.api';
import Link from 'next/link';
import CustomPagination from './pagination';
import Filters from './filters';

export default function SnippetsList() {

    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [tag, setTag] = useState("");

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 1000);

        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        
        getAllSnippets(page, search, tag)
        .then((data: GetSnippetsResponse) => {
          setSnippets(data.items);
          setPages(data.pages);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));

    }, [page, debouncedSearch, tag]);

    const handleDelete = async (e: React.MouseEvent, id: string) => {
      e.preventDefault();

      try {
        await deleteSnippet(id);

        setSnippets(prev => prev.filter(el => el._id !== id));
      } catch (err) {
        alert("Не вдалося видалити сніпет");
      }
    };

    if (loading) return <div className='text-lg'>Loading...</div>;

    
  return (
    <div className="flex flex-col items-center gap-5 w-[85%] pb-6 ">
      <Filters search={search} tag={tag}  
        onSearchChange={(value: string) => {
          setPage(1);
          setSearch(value);
        }} 
        onTagChange={(value: string) => {
          setPage(1);
          setTag(value);
        }}
      />

      {(!loading && snippets.length === 0) ?
      
      <div>Сніпетів поки немає</div>
      
      :(
        <div className="w-full flex flex-col gap-4">
          {snippets.map((snippet) => (
            <Link href={`/${snippet._id}`} key={snippet._id} className='w-full'>
              <div className="p-4 border rounded shadow-sm flex justify-between">
                <div className='flex flex-col gap-2'>
                  <h3 className="font-bold">{snippet.title}</h3>
                  <p>{snippet.content}</p>
                  <p className="text-sm text-gray-400">{snippet.type}</p>
                </div>
                  
                <button onClick={(event) => handleDelete(event, snippet._id)} className='h-fit'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>  
              </div>
            </Link>
          ))}

          <div className="flex justify-center mt-6">
            <CustomPagination page={page} pages={pages} setPage={setPage} 
            />
          </div>
        </div>
      )} 
    </div>
  )
}
