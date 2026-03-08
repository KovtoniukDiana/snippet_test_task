import CustomForm from './common/form';
import { updateSnippet } from '@/src/lib/snippets.api';
import { CreateSnippetDto } from '@/src/types/snippet';


interface IProps {
    id: string;
    initialData: CreateSnippetDto;
    onClose: () => void;
}

export default function EditingForm({id, initialData, onClose} : IProps) {

    const handleSubmit = async (data: CreateSnippetDto) => {
        await updateSnippet(id, data);
        onClose();
    };


  return (
    <CustomForm initialData={initialData} onSubmit={handleSubmit} onClose={onClose}  />
  )
}
