import React, { useState } from 'react';
import '../../Asserts/Styles/Parent.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";


function LoginParent() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const goback = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="container parent_login_container">
                <div className='row parent_login_main'>
                    <div className='col-2 parent_login_main_text'>
                        <FaArrowLeft size={40} onClick={goback} />
                    </div>
                    <div className='col-10 '>
                        <h1>LOGIN - PARENT</h1>
                    </div>
                </div>
                <form>
                    <div className="parent_login-form_sty">
                        <div>
                            <label className="mb-2">E-mail</label>
                            <input type="email" className="parent_login_input_style form-control" />
                        </div>
                        <div className="mt-4">
                            <label className="mb-2">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="parent_login_input_style form-control"
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p className="parent_forgot-text pt-2">Forgot Password?</p>
                        </div>
                        <div className="parent_button-center">
                            <button type="button" className="btn btn-light mt-4 parent_login_button">LOGIN</button>
                        </div>
                        <div className="p-4">
                            <p className="parent_register_text">Don't have an account? <Link to="/ParentReg">Register Here</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginParent;
