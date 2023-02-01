import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditFormReview from './index';

function EditReviewModal({review}) {
    const [showModal, setShowModal] = useState(false)
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button className="edit-review-btn" onClick={() => setShowModal(true)}>Edit Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditFormReview review={review} closeModal={closeModal} />
                </Modal>
            )}


        </>
    )
}

export default EditReviewModal
