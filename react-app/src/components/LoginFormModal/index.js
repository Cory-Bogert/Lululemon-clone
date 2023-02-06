import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import LoginForm from '../auth/LoginForm'
import DemoUser from '../Demo'
import './index.css'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button className='login-btn' onClick={() => setShowModal(true)}>Log In</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <LoginForm />
                {/* <DemoUser /> */}
            </Modal>
        )}


        </>
    )
}
export default LoginFormModal
