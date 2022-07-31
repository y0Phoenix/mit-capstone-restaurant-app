import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../../types/State'
import { resetModal } from '../../actions/modal';
import { updateRestaurant } from '../../actions/restaurant';
import ModalItem from './ModalItem';
import ModalConfirm from './ModalConfirm';

const mapStateToProps = (state: State) => ({
    modal: state.modal
});

const connector = connect(mapStateToProps, {resetModal, updateRestaurant});

type Props = ConnectedProps<typeof connector>;

const Modal: React.FC<Props> = ({modal, resetModal, updateRestaurant}) => (
    <>
        <ModalItem state={modal.item} resetModal={resetModal}/>
        <ModalConfirm state={modal.confirm} resetModal={resetModal}/>
    </>
);

export default connector(Modal);