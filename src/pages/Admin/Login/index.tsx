import "./style.css";
import { Card, CardContent } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CONFIG } from "../../../config";
import { login } from '../../../services';
import { Button, Image, TextInput } from '../../../components';
import { createSignal } from '../../../utils';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import StyledIcon from "../../../components/StyledIcon";

const Login = () => {
    const navigate = useNavigate();
    const [showPass, setShow] = useState(false);
    const [user, setUser] = useState({
        userName: "",
        passWord: "",
        isAdmin: true
    })

    const loginAdmin = async () => {
        const { signal } = createSignal();
        const { error, data }: any = await login(user, signal)
        if (!error) {
            toast.success(data.message);
            localStorage.setItem("quikk-admin", data.token)
            localStorage.setItem("adminUser", data.name)
            navigate('/admin/getAllLeads/all')
        } else {
            toast.error(data.message);
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh", backgroundColor: "#d5d5d5" }}>
            <Card style={{ width: 500, backgroundColor: "white" }}>
                <CardContent>
                    <div className='mb-5'>
                        <p className='text-center pointer' onClick={() => navigate('/')}><Image src={CONFIG.images.LOGO} style={{ width: 200 }} /></p>
                        <h2 className='text-center text-secondary'><u>Admin Login</u></h2>
                    </div>
                    <div className='mt-3'>
                        <TextInput
                            fullWidth
                            label='User Name'
                            name='userName'
                            value={user.userName}
                            onChange={(e: any) => setUser({ ...user, userName: e.target.value })}
                        />
                        <TextInput
                            fullWidth
                            type={showPass ? "text" : "password"}
                            label='Password'
                            name='password'
                            value={user.passWord}
                            onChange={(e: any) => setUser({ ...user, passWord: e.target.value })}
                            onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && loginAdmin()}
                            icon={<span className="pointer" onClick={()=> setShow(!showPass)}>{showPass ? <StyledIcon icon={RemoveRedEyeIcon} /> : <StyledIcon icon={VisibilityOffIcon} /> }</span>}
                            position="end"
                        />
                    </div>
                    <div className="text-center">
                        <Button onClick={loginAdmin} size='large'>
                            Login
                        </Button>{' '}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
