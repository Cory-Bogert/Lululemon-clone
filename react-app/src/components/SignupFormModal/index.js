import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import SignUpForm from '../auth/SignUpForm'
// import DemoUser from '../Demo'

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button className='signup-btn' onClick={() => setShowModal(true)}>Signup Modal</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <SignUpForm />
            </Modal>
        )}


        </>
    )
}
export default SignupFormModal
