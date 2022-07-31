import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State';
import { removeAlert } from '../actions/alert';
import { Alert, Button, Modal } from 'react-bootstrap';

const mapStateToProps = (state: State) => ({
    alert: state.alert
});

const connector = connect(mapStateToProps, {removeAlert});

type Props = ConnectedProps<typeof connector>;

const innerHTML = (html: string) => ({__html: html});

const AlertComp: React.FC<Props> = ({alert, removeAlert}) => {
    const handleClose = () => {
        removeAlert();
    };
    if (alert.show) {
        if (alert.options.type === 'alert') setTimeout(handleClose, 5000);
        return (
            <>
                <div className='alert top-right'>
                    {alert.options.type === 'alert' && alert.show ? (
                        <Alert variant={alert.options.variant} onClose={handleClose} dismissible>
                            <Alert.Heading>{alert.title}</Alert.Heading>
                            <p>{alert.text}</p>
                        </Alert>
                    ) : (
                        <Modal show={alert.show} onHide={handleClose}>
                            <Modal.Header closeButton onHide={handleClose} style={{
                                backgroundColor: alert.options.variant === 'error' ? 'red' : (alert.options.variant === 'success' ? 'green' : 'yellow')
                            }}>
                                <Modal.Title>{alert.title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='flex-vertical space-between'>
                                    {alert.validator?.bool ? 
                                        (
                                            <>
                                                <div className='flex-vertical gap-md' dangerouslySetInnerHTML={innerHTML(alert.text)}></div>
                                                <br></br>
                                            </>
                                        )
                                        :
                                        (
                                            <h3>{alert.text}</h3>
                                        )
                                    }
                                    <Button variant='primary' onClick={handleClose}>Ok</Button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    )
                    }
                </div>
            </>
      )
    }
    return <div className="alert top-right"></div>;
}

export default connector(AlertComp);