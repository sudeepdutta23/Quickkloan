import { Alert, Button } from '@mui/material';
import { Modal } from '../UI'
interface Popup {
  modalType: "info" | "success" | "error" | "warning";
  title: string;
  content: any;
  open: boolean;
  onOk: any;
  okText?: any;
  toggleModal?: any;
}
export const PopUp = ({
  modalType,
  title,
  content,
  open,
  onOk,
  toggleModal,
  okText
}: Popup) => {

  return (
    <Modal open={open} title={<Alert severity={modalType}>{title}</Alert>} toggleModal={toggleModal} actions={<div><Button onClick={onOk}>{okText}</Button><Button onClick={toggleModal}>Cancel</Button></div>}>
      {content}
    </Modal>
  )

}

