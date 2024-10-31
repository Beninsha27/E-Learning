import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import profile from '../../Asserts/Images/profile.jpg';

function RegisterTrainer() {
    const [selectedImage, setSelectedImage] = useState(profile);
    const [showpassword, setShowPassword] = useState(false)
    const [showpassword1, setShowPassword1] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dateOfBirth: '',
        course: '',
        qualification: '',
        experiance: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState({});

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))

        setError((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }))
    }

    const validateFields = () => {
        const newErrors = {};

        // Validate  name (only letters)
        if (!formData.name) {
            newErrors.name = 'First Name is required';
        } else if (!/^[A-Za-z]+$/.test(formData.name)) {
            newErrors.name = 'First Name must contain only letters';
        }

        // Validate mobile number (10 digits)
        if (!formData.mobile) {
            newErrors.mobile = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile Number must be 10 digits';
        }

        // Validate email format
        if (!formData.email) {
            newErrors.email = 'E-Mail is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = 'Email must be in correct format';
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (
            !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}/.test(formData.password)
        ) {
            newErrors.password =
                'Password must be at least 6 characters long, and include a combination of uppercase, lowercase, number, and symbol';
        }

        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Validate date of birth
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';

        // Validate gender
        if (!formData.gender) newErrors.gender = 'Gender is required';

        // Validate  Course 
        if (!formData.course) {
            newErrors.course = 'Course Name is required';
        } else if (!/^[A-Za-z]+$/.test(formData.course)) {
            newErrors.course = 'First Name must contain only letters';
        }

        // Validate  Qualification
        if (!formData.qualification) {
            newErrors.qualification = 'Qualification is required';
        } else if (!/^[A-Za-z]+$/.test(formData.qualification)) {
            newErrors.qualification = 'First Name must contain only letters';
        }

        if (!formData.experiance) {
            newErrors.experiance = 'Experience is required';
        } else if (!/^\d+$/.test(formData.experiance)) {
            newErrors.experiance = 'Experience must be a number';
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            console.log('Form submitted:', formData);
        }
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
                <form onSubmit={handleSubmit}>
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
                                <input
                                    type="text"
                                    className={`trainer_login_input_style form-control ${error.name ? 'is-invalid' : ''}`}
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {error.name && <div className="invalid-feedback">{error.name}</div>}

                            </div>
                        </div>
                        <div className='col-6'>
                            <label className="mb-2">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={`trainer_login_input_style form-control ${error.gender ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {error.gender && <div className="invalid-feedback">{error.gender}</div>}

                        </div>

                    </div>
                    <div className='row mt-3'>

                        <div className="col-6">
                            <div>
                                <label className="mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className={`trainer_login_input_style form-control ${error.dateOfBirth ? 'is-invalid' : ''}`}
                                />
                                {error.dateOfBirth && <div className="invalid-feedback">{error.dateOfBirth}</div>}

                            </div>
                        </div>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">Course</label>
                                <input
                                    name='course'
                                    type="text"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className={`trainer_login_input_style form-control ${error.course ? 'is-invalid' : ''}`}
                                />
                                {error.course && <div className="invalid-feedback">{error.course}</div>}

                            </div>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">Qualification</label>
                                <input
                                    type="text"
                                    name='qualification'
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    className={`trainer_login_input_style form-control ${error.qualification ? 'is-invalid' : ''}`}
                                />
                                {error.qualification && <div className="invalid-feedback">{error.qualification}</div>}

                            </div>
                        </div>
                        <div className='col-6'>
                            <label className="mb-2">Experiance</label>
                            <input
                                type="text"
                                name='experiance'
                                value={formData.experiance}
                                onChange={handleChange}
                                className={`trainer_login_input_style form-control ${error.experiance ? 'is-invalid' : ''}`}
                            />
                            {error.experiance && <div className="invalid-feedback">{error.experiance}</div>}

                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <div>
                                <label className="mb-2">Mobile</label>
                                <input
                                    type="tel"
                                    className={`trainer_login_input_style form-control ${error.mobile ? 'is-invalid' : ''}`}
                                    name='mobile'
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />
                                {error.mobile && <div className="invalid-feedback">{error.mobile}</div>}
                            </div>
                        </div>
                        <div className='col-6'>
                            <label className="mb-2">E-Mail</label>
                            <input
                                type="email"
                                className={`trainer_login_input_style form-control ${error.email ? 'is-invalid' : ''}`}
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {error.email && <div className="invalid-feedback">{error.email}</div>}

                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6">
                            <div className='stu_password-input-wrapper'>
                                <label className="mb-2">Password</label>
                                <input
                                    type={showpassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`trainer_login_input_style form-control ${error.password ? 'is-invalid' : ''}`}
                                />
                                {/* <span className='trainer_password-toggle-icon'
                                    onClick={tooglePasswordVisibility}>
                                    {showpassword ? <FaEyeSlash /> : <FaEye />}
                                </span> */}
                                {/* Conditionally render the icon if there's no password error */}
                                {!error.password && (
                                    <span className="stu_password-toggle-icon" onClick={tooglePasswordVisibility}>
                                        {showpassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                )}
                                {error.password && <div className="invalid-feedback">{error.password}</div>}

                            </div>
                        </div>
                        <div className="col-6">
                            <div className='trainer_password-input-wrapper'>
                                <label className="mb-2">Confirm Password</label>
                                <input
                                    type={showpassword1 ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`trainer_login_input_style form-control ${error.confirmPassword ? 'is-invalid' : ''}`}
                                    />
                                {/* <span className='trainer_password-toggle-icon'
                                    onClick={tooglePasswordVisibility1}>
                                    {showpassword1 ? <FaEyeSlash /> : <FaEye />}
                                </span> */}
                                {/* Conditionally render the icon if there's no password error */}
                                {!error.confirmPassword && (
                                    <span className="stu_password-toggle-icon" onClick={tooglePasswordVisibility}>
                                        {showpassword1 ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                )}
                                {error.confirmPassword && <div className="invalid-feedback">{error.confirmPassword}</div>}

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