import { Modal } from '../../context/Modal';
import SignupFormPage from './index'


function SignupFormModal({ showSignupModal, setShowSignupModal }) {

    return (
        <div>
            {showSignupModal && (
                <Modal onClose={() => setShowSignupModal(false)}>
                    <SignupFormPage setShowSignupModal={setShowSignupModal}/>
                </Modal>
            )}
        </div>
    );
}

export default SignupFormModal
