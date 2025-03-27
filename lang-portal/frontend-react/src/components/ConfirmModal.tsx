import React from 'react';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-modal">
      <p className="modal-message">{message}</p>
      <div className="modal-actions">
        <button onClick={onConfirm} className="confirm-button">
          Confirm
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
