import React, { useState } from 'react';
import '../../Asserts/Styles/Login.css';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        if (email === 'admin' && password === '123') {
            alert("Login Success")
        } else {

            alert("Login Failed")
        }
    };

    return (
        <>
            <div className='container login_container'>
                <form>
                    <div className='login-form_sty'>
                        <div className=''>
                            <label className='mb-2'>User Name :</label>
                            <input
                                type='email'
                                className='login_input_style form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mt-4 mb-4'>
                            <label className='mb-2'>Password :</label>
                            <div className='password-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='login_input_style form-control'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className='password-toggle-icon' onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        <div className='button-center'>
                            <button
                                type="button"
                                className="btn btn-light mt-4 login_button"
                                onClick={handleLogin}
                            >
                                LOGIN
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    );
}

export default AdminLogin