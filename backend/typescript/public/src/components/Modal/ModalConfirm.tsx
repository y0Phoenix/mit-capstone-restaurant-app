import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ConfirmModal } from '../../types/Modal'

interface Props {
    state: ConfirmModal,
    resetModal: () => void,
};

const ModalConfirm: React.FC<Props> = ({state, resetModal}) => {
    return (
        <Modal show={state.show} size='sm' onHide={resetModal}>
            <Modal.Header closeButton onHide={resetModal} style={{
                                backgroundColor: state.type == 'danger' ? 'red' : 'yellow'
                            }}>
                <Modal.Title>{state.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='flex-vertical space-between gap-lg'>
                    <h5>{state.text}</h5>
                    <div className='flex-horizontal space-between'>
                        <Button variant='primary' onClick={() => {
                            state.callback(state.payload);
                            resetModal();
                        }}>
                            Yes
                        </Button>
                        <Button variant='primary' onClick={resetModal}>
                            No
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalConfirm