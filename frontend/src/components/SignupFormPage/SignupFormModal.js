import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index'
import {useDispatch} from 'react-redux'


function SignupFormModal({ showSignupModal, setShowSignupModal }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    return (
        <>
            {/* <button onClick={() => setShowModal(true)}>Sign Up</button> */}
            {showSignupModal && (
                <Modal onClose={() => setShowSignupModal(false)}>
                    <SignupFormPage setShowSignupModal={setShowSignupModal}/>
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal
