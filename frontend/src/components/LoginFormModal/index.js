import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ showLoginModal, setShowLoginModal }) {

  return (
    <div>
      {showLoginModal && (
        <Modal className='login-modal' onClose={() => setShowLoginModal(false)}>
          <LoginForm setShowLoginModal={setShowLoginModal} />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
