import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import SignUpForm from '../auth/SignUpForm'
import './index.css'
// import DemoUser from '../Demo'

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button className='signup-btn' onClick={() => setShowModal(true)}>Signup</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <SignUpForm />
            </Modal>
        )}


        </>
    )
}
export default SignupFormModal
