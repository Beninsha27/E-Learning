import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";


function LoginTrainer() {
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
            <div className="container trainer_login_container">
                <div className='row trainer_login_main'>
                    <div className='col-2 strainer_login_main_text'>
                        <FaArrowLeft size={40} onClick={goback} />
                    </div>
                    <div className='col-10 '>
                        <h1>LOGIN - TRAINER</h1>
                    </div>
                </div>
                <form>
                    <div className="trainer_login-form_sty">
                        <div>
                            <label className="mb-2">E-mail</label>
                            <input type="email" className="trainer_login_input_style form-control" />
                        </div>
                        <div className="mt-4">
                            <label className="mb-2">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="trainer_login_input_style form-control"
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p className="trainer_forgot-text pt-2">Forgot Password?</p>
                        </div>
                        <div className="trainer_button-center">
                            <button type="button" className="btn btn-light mt-4 trainer_login_button">LOGIN</button>
                        </div>
                        <div className="p-4">
                            <p className="trainer_register_text">Don't have an account? <Link to="/TrainerReg">Register Here</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginTrainer