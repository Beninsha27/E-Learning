import React, { useState } from 'react'
import '../../Asserts/Styles/Students.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";

function LoginStudent() {
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
            <div className="container stu_login_container">
                <div className='row stu_login_main'>
                    <div className='col-2 stu_login_main_text'>
                        <FaArrowLeft size={40} onClick={goback}/>
                    </div>
                    <div className='col-10 '>
                        <h1>LOGIN - STUDENT</h1>
                    </div>
                </div>

                <form>
                    <div className="stu_login-form_sty">
                        <div>
                            <label className="mb-2">E-mail</label>
                            <input type="email" className="stu_login_input_style form-control" />
                        </div>
                        <div className="mt-4">
                            <label className="mb-2">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="stu_login_input_style form-control"
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p className="stu_forgot-text pt-2">Forgot Password?</p>
                        </div>
                        <div className="stu_button-center">
                            <button type="button" className="btn btn-light mt-4 stu_login_button">LOGIN</button>
                        </div>
                        <div className="pt-4">
                            <p className="stu_register_text">Don't have an account? <Link to="/StudentReg">Register Here</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginStudent