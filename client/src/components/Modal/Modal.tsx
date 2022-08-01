import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../../types/State'
import { resetModal } from '../../actions/modal';
import { initOrder } from '../../actions/order';
import { setAlert } from '../../actions/alert';
import ModalConfirm from './ModalConfirm';
import ModalDelivery from './ModalDelivery';

const mapStateToProps = (state: State) => ({
    modal: state.modal,
    user: state.user
});

const connector = connect(mapStateToProps, {resetModal, initOrder, setAlert});

type Props = ConnectedProps<typeof connector>;

const Modal: React.FC<Props> = ({modal, resetModal, initOrder, setAlert, user}) => (
    <>
        <ModalDelivery state={modal.delivery} resetModal={resetModal} initOrder={initOrder} setAlert={setAlert} user={user}/>
        <ModalConfirm state={modal.confirm} resetModal={resetModal}/>
    </>
);

export default connector(Modal);