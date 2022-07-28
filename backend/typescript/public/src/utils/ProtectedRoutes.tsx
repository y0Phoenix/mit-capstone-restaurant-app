import { AnyMxRecord } from 'dns';
import { type } from 'os';
import React, { FC, ReactNode } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import {Navigate, Outlet, Route, useLocation } from 'react-router-dom';
import State from '../types/State'

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.user.isAuthenticated, 
    pathname: ''
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
  pathname: string
};

const ProtectedRoutes: React.FC<Props> = ({isAuthenticated, pathname}) =>  {
  if (isAuthenticated === null) return <Outlet />;
  return (
    <>
      {isAuthenticated ? <Outlet /> : <Navigate to={'/'}/>}
    </>
  );
}


export default connector(ProtectedRoutes);