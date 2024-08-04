import {useState} from 'react';

const useModal = () => {
  const [open, setOpen] = useState(false); //모달 오픈 상태

  /** 모달 열기 */
  const handleOpen = () => {
    setOpen(true);
  };

  /** 모달 닫기 */
  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    handleClose,
  };
};

export default useModal;
