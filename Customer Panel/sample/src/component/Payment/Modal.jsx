import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <button onClick={onClose} className="modal-close-button">X</button>
        {children}
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-cancel-button">Cancel</button>
          <button onClick={onSubmit} className="modal-submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
