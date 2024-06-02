import React, { createContext, useEffect, useState } from 'react'
import { Modal } from '../UI'
import Login from './Login'
import Register from './Register'
import Otp from './Otp'
import { Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { usePreLoginState } from '../../hooks'

export const AuthContext = createContext({});

export type AuthType = 'login' | 'registration' | 'otp';

export const Auth = () => {
    const location = useLocation();
    const isAdmin = location.pathname.includes('/admin');
    const [authType, setAuth] = useState<AuthType>(!isAdmin ? 'login' : 'registration');
    const [title, setTitle] = useState(!isAdmin ? 'Login': 'Create Lead');
    const [user, setUser] = useState(null);

    const { state: { showSignUp }, dispatch }: any = usePreLoginState();
    const modalTitle = () => {
        return (<>
            <Typography component="div">
                {title}
            </Typography>
            <Typography sx={{ mt: 1 }} component="p" className="text-dark">
                Get loans approved faster
            </Typography>
        </>)
    }

    const getAuth = () =>{
        switch (authType) {
            case 'registration':
                return <Register />;
            case 'otp':
                return <Otp />
            case 'login':
                return <Login />;
        }
    }

    const handleModalClose = () =>{
        dispatch('TOGGLE_AUTH')
        setAuth(!isAdmin ? 'login' : 'registration')
    }

    useEffect(()=>{
        return () => setUser(null);
    },[])

    return (
        <Modal title={modalTitle()} open={showSignUp} toggleModal={handleModalClose}>
            <AuthContext.Provider value={{ setAuth, setTitle, user, setUser, authType }}>
            {getAuth()}
            </AuthContext.Provider>
        </Modal>
    )
}
