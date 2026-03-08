'use client'
import React, {useState} from 'react'
import {Form, Input, Button, Select, SelectItem, Textarea} from "@heroui/react";
import { CreateSnippetDto } from '@/src/types/snippet';

interface IProps {
    initialData?: CreateSnippetDto;
    onSubmit: (data: CreateSnippetDto) => Promise<void>;
    onClose: () => void;
}


export default function CustomForm({ initialData, onSubmit , onClose}: IProps) {


    const [formData, setFormData] = useState<CreateSnippetDto>(
        {
            title: initialData?.title || '',
            content: initialData?.content || '',
            tags: initialData?.tags || [],
            type: initialData?.type || 'note',
        }
    )


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            onClose();
            window.location.reload();
            
        } catch (err) {
            console.error("Помилка:", err);
        }
    }

  return (
    <Form className='w-full' onSubmit={handleSubmit} >

        <Input placeholder='Title' isRequired name='title' value={formData.title}
        classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus: outline-none'}}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        validate={(value) => {
            if(!value) return "Заголовок обов'язковий"

        }}  />

        <Textarea placeholder='Content' name='content' value={formData.content}
        classNames={{inputWrapper: 'bg-default-100', input: 'text-sm focus: outline-none'}}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
        validate={(value) => {
            if(!value) return "Контент обов'язковий"

        }}  />

        <Input
        name='Tags'
        placeholder='Tags (через кому)'
        value={(formData.tags ?? []).join(', ')}
        onChange={(e) => setFormData({
            ...formData,
            tags: e.target.value.split(',').map(t => t.trim())
        })}
        />


        <Select
        placeholder="Type"
        variant="bordered"
        selectedKeys={[formData.type]}
        onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string
            setFormData({...formData, type: value as any})
        }}
        classNames={{
            label: "text-default-500 pb-2",
            trigger: "bg-pink-100 border-2 border-gray-100",
            popoverContent: "bg-pink-50 border border-gray-100",
            listboxWrapper: "bg-pink-50",
        }}
        >

            <SelectItem key="note">Нотатка</SelectItem>
            <SelectItem key="command">Команда</SelectItem>
            <SelectItem key="link">Посилання</SelectItem>
        </Select>

        <div className='flex justify-between'>
            <Button color="danger" variant="light" onPress={onClose}>
                Закрити
            </Button>
            <Button color="primary" type='submit'>
                Продовжити
            </Button>
        </div>

    </Form>
  )
}