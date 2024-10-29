import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import profile from '../../Asserts/Images/profile.jpg';

function RegisterTrainer() {
    const [selectedImage, setSelectedImage] = useState(profile);
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
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleImageClick = () => {
        document.getElementById('fileInput').click();
    };
    return (
        <>
            <div className="container trainer_reg_container">
                <div className="row stu_login_main">
                    <div className="col-3 stu_login_main_text">
                        <FaArrowLeft size={40} onClick={goback} />
                    </div>
                    <div className="col-9">
                        <h1>REGISTER - TRAINER</h1>
                    </div>
                </div>
                <form>
                    <div className="row">
                        <div className="col-12 trainer_reg_img">
                            <img
                                src={selectedImage}
                                alt="Profile"
                                className="img-fluid trainer_reg_profile"
                                onClick={handleImageClick}
                                style={{ cursor: 'pointer' }}
                            />
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">Name</label>
                                <input type="text" className="trainer_login_input_style form-control" />
                            </div>
                        </div>
                        <div className='col-6'>
                            <label className="mb-2">Gender</label>
                            <select
                                name="gender"
                                className='stu_login_input_style form-control'
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                    </div>
                    <div className='row mt-3'>

                        <div className="col-6">
                            <div>
                                <label className="mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="stu_login_input_style form-control"

                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">Course</label>
                                <input type="text" className="trainer_login_input_style form-control" />
                            </div>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">Qualification</label>
                                <input type="text" className="trainer_login_input_style form-control" />
                            </div>
                        </div>
                        <div className='col-6'>
                            <label className="mb-2">Experiance</label>
                            <input type="text" className="trainer_login_input_style form-control" />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">Mobile</label>
                                <input type="tel" className="trainer_login_input_style form-control" />
                            </div>
                        </div>
                        <div className='col-6'>
                            <label className="mb-2">E-Mail</label>
                            <input type="email" className="trainer_login_input_style form-control" />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6">
                            <div className='stu_password-input-wrapper'>
                                <label className="mb-2">Password</label>
                                <input
                                    type={showpassword ? 'text' : 'password'}
                                    name="password"
                                    className="trainer_login_input_style form-control"
                                />
                                <span className='trainer_password-toggle-icon'
                                    onClick={tooglePasswordVisibility}>
                                    {showpassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className='trainer_password-input-wrapper'>
                                <label className="mb-2">Confirm Password</label>
                                <input
                                    type={showpassword1 ? 'text' : 'password'}
                                    name="confirmPassword"
                                    className="stu_login_input_style form-control "
                                />
                                <span className='trainer_password-toggle-icon'
                                    onClick={tooglePasswordVisibility1}>
                                    {showpassword1 ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="stu_button-center mt-3">
                        <button type="submit" className="btn btn-light mt-4 stu_login_button">REGISTER</button>
                    </div>
                    <div className="pt-4">
                        <p className="stu_register_text">Already have an account? <Link to="/TrainerLogin">Login Here</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterTrainer