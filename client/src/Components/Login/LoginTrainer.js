import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from '../Constants/Baseurl';
import { toast } from 'react-toastify';


function LoginTrainer() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const goback = () => {
        navigate(-1)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        console.log({ ...data, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        axiosInstance.post('/Trainerlogin', data)
            .then((response) => {
                console.log('Success:', response);

                // Save the student ID to localStorage
                localStorage.setItem("logstudentid", response.data.id);
                console.log(response.data.id);

                // Display login success notification
                toast.success('Logged in successfully');
                navigate('');
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    toast.warning('Email not found');
                } else if (error.response && error.response.status === 401) {
                    toast.warning('Incorrect password');
                }else if (error.response && error.response.status === 403) {
                    toast.warning('Account is inactive. Please contact admin.');
                } else {
                    console.error('Error:', error);
                    toast.error('An error occurred. Please try again.');
                }
            });

    };

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
                <form onSubmit={handleLogin}>
                    <div className="trainer_login-form_sty">
                        <div>
                            <label className="mb-2">E-mail</label>
                            <input type="email" className="trainer_login_input_style form-control" name='email' onChange={handleChange} />
                        </div>
                        <div className="mt-4">
                            <label className="mb-2">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="trainer_login_input_style form-control"
                                    name='password'
                                    onChange={handleChange}
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p className="trainer_forgot-text pt-2">Forgot Password?</p>
                        </div>
                        <div className="trainer_button-center">
                            <button type="submit" className="btn btn-light mt-4 trainer_login_button">LOGIN</button>
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