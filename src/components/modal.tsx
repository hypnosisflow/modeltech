import React, { useEffect } from "react";
import { CustomForm } from "../components/custom-form";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import "./modal.scss";

interface ModalProps {
  theme?: string;
  children: React.ReactNode;
}

export const Modal = ({ theme, children }: ModalProps) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   window.addEventListener("click", (event) => {
  //     if (event.target.id || event.currentTarget.id !===)
  //   })
  // })

  return (
    <div className="modal-overlay">
      <div id="modal-layout" className="modal-layout">
        <button className="modal-close" onClick={() => navigate(-1)}>
          <i className="pi pi-times"></i>
        </button>
        {/* <CustomForm /> */}
        {children}
      </div>
    </div>
  );
};
