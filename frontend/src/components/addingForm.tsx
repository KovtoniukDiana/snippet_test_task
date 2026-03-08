import CustomForm from './common/form';
import { createSnippet } from '@/src/lib/snippets.api';
import { CreateSnippetDto } from '@/src/types/snippet';


interface IProps {
    onClose: () => void;
}

export default function AddingForm({onClose} : IProps) {

    const handleSubmit = async (data: CreateSnippetDto) => {
        await createSnippet(data);
        onClose();
    };


  return (
    <CustomForm onSubmit={handleSubmit} onClose={onClose}  />
  )
}
