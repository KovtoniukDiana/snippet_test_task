'use client'
import React, {useState} from 'react'
import { Button, Link } from '@heroui/react'
import CreateModal from './createModal';

export default function Header() {

    const [isModalOpen, setIsModalOpen] =  useState(false);

  return (
    <header className='flex justify-center  pt-5 pb-5 bg-blue-200 w-full mb-10'>
        <div className='w-[85%] flex justify-between'>
            <p className='font-bold text-xl'>Snippet manager</p>

            <Button variant='bordered'className="border-2 border-gray-600 text-xl rounded-xl hover:scale-110 " 
                onPress={() => setIsModalOpen(true)}>
                Створити сніпет
            </Button>

            <CreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    </header>
  )
}
