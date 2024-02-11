import React from "react";
import { useNavigate } from "react-router-dom";
import "./modal.scss";

interface ModalProps {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div id="modal-layout" className="modal-layout">
        <button className="modal-close" onClick={() => navigate(-1)}>
          <i className="pi pi-times"></i>
        </button>
        {children}
      </div>
    </div>
  );
};
