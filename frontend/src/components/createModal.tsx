'use client'
import CustomModal from "./common/modal"
import AddingForm from "./addingForm";


interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateModal({isOpen, onClose}: IProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Створити сніпет">
        <AddingForm  onClose={onClose} />
    </CustomModal>
  )
}