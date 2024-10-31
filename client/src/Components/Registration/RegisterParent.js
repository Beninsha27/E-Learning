import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import profile from '../../Asserts/Images/profile.jpg';

function RegisterParent() {
    const [showpassword, setShowPassword] = useState(false)
    const [showpassword1, setShowPassword1] = useState(false)
    const navigate = useNavigate()
    const goback = () => {
        navigate(-1);
    };
    const tooglePasswordVisibility = () => {
        setShowPassword(!showpassword)
    }
    const tooglePasswordVisibility1 = () => {
        setShowPassword1(!showpassword1)
    }
    return (
        <>
            <div className="container trainer_reg_container">
                <div className="row stu_login_main">
                    <div className="col-3 stu_login_main_text">
                        <FaArrowLeft size={40} onClick={goback} />
                    </div>
                    <div className="col-9">
                        <h1>REGISTER - PARENT</h1>
                    </div>
                </div>
                <form>

                    <div className='row mt-3'>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">First Name</label>
                                <input type="text" className="trainer_login_input_style form-control" />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">Last Name</label>
                                <input type="text" className="trainer_login_input_style form-control" />
                            </div>
                        </div>

                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">Mobile</label>
                                <input type="tel" className="trainer_login_input_style form-control" />
                            </div>
                        </div>
                        <div className="col-6">
                            <label className="mb-2">E-Mail</label>
                            <input type="email" className="trainer_login_input_style form-control" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6">
                            <div className='parent_password-input-wrapper'>
                                <label className="mb-2">Password</label>
                                <input
                                    t type={showpassword ? 'text' : 'password'}
                                    name="password"
                                    className="stu_login_input_style form-control"
                                />
                                <span className='parent_password-toggle-icon'
                                    onClick={tooglePasswordVisibility}>
                                    {showpassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                        </div>
                        <div className="col-6">
                            <div className='parent_password-input-wrapper'>
                                <label className="mb-2">Confirm Password</label>
                                <input
                                    type={showpassword1 ? 'text' : 'password'}
                                    name="confirmPassword"
                                    className="stu_login_input_style form-control "
                                />
                                <span className='parent_password-toggle-icon'
                                    onClick={tooglePasswordVisibility1}>
                                    {showpassword1 ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr className='parent_register_hr' />
                    <div className="row mt-4">
                        <div className="col-6">
                            <input
                                type="password"
                                name="password"
                                placeholder='Student Email'
                                className="stu_login_input_style form-control"
                            />
                        </div>
                        <div className="col-6">
                            <button className="btn btn-light stu_login_input_style">Add Your Student's Mail</button>
                        </div>
                        {/* <label className='mt-3 pt-3 ms-4'>gr</label> */}

                    </div>
                    <div className="stu_button-center mt-3">
                        <button type="submit" className="btn btn-light mt-4 stu_login_button">REGISTER</button>
                    </div>
                    <div className="pt-4">
                        <p className="stu_register_text">Already have an account? <Link to="/ParentLogin">Login Here</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterParent