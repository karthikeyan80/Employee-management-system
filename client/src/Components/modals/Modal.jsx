// Modal.js
export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <div className="modal-body">
          {children}
        </div>
        </div>
    </div>
  );
}

const backdropStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1050,
};

const modalStyle = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: '10px',
  width: '500px',
  boxShadow: '0 0 10px rgba(0,0,0,0.25)',
};