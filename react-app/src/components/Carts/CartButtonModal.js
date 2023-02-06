import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
import { CartModal } from '../../context/CartModal';
import CartPage from '.';
import './index.css'
// import './createReview.css'
function CartButtonModal() {
    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button className='cart-btn' onClick={() => setShowModal(true)}><i class="fa-solid fa-cart-shopping"></i></button>
            {showModal && (
                <CartModal className='modal' onClose={() => setShowModal(false)} >
                    <CartPage closeModal = {closeModal} />
                </CartModal>
            )}

        </>
    )
}

export default CartButtonModal
