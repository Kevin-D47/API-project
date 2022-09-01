import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ showLoginModal, setShowLoginModal }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Log In</button> */}
      {showLoginModal && (
        // <Modal onClose={() => setShowModal(false)}>
        //   <LoginForm />
        // </Modal>
        <Modal className='login-modal' onClose={() => setShowLoginModal(false)}>
          <LoginForm setShowLoginModal={setShowLoginModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
