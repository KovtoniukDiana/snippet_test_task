'use client'
import CustomModal from "./common/modal"
import EditingForm from "./editingForm";
import { CreateSnippetDto } from "../types/snippet";


interface IProps {
    id: string;
    initialData: CreateSnippetDto;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditModal({id, initialData, isOpen, onClose}: IProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Редагувати сніпет">
        <EditingForm initialData={initialData} id={id}  onClose={onClose} />
    </CustomModal>
  )
}