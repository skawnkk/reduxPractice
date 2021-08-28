import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { openModal, closeModal } from "../modules/modal";
import Modal from "../componenets/Modal/Modal";
export default function ModalContainer() {
  const { open, title } = useSelector(
    (state) => ({
      open: state.modal.open,
      title: state.modal.title,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const modalOpen = (title) => dispatch(openModal(title));
  const modalClose = () => dispatch(closeModal());

  return (
    <>
      <button onClick={() => modalOpen("하이")}>POP_UP</button>
      {open && <Modal title={title} modalClose={modalClose} />}
    </>
  );
}
