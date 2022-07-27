import path from 'path';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import State from '../types/State';

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.user.isAuthenticated
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
//   pathname: string
};

const Redirect: React.FC<Props> = ({isAuthenticated}) => {
    return (
        <>
            {isAuthenticated 
                // (pathname.includes('/') || pathname.includes('/register'))) 
                ? <Navigate to={'/home'} /> : <Outlet />}
        </>
    )
}

export default connector(Redirect);