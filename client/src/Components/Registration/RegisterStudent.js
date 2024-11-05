import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import profile from '../../Asserts/Images/profile.jpg';
import axiosInstance from '../Constants/Baseurl';
import axiosMultipartInstance from '../Constants/FornDataUrl';
import { toast } from 'react-toastify';

function RegisterStudent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [selectedImage, setSelectedImage] = useState(profile);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    profile: null,
  });
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  }
  const goBack = () => {
    navigate(-1);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profile: file,
      }));
      const reader = new FileReader();
      reader.onload = (event) => setSelectedImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    console.log({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First Name must contain only letters';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last Name must contain only letters';
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required';
    }
    else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number must be 10 digits';
    }
    if (!formData.email) {
      newErrors.email = 'E-Mail is required';
    }
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Email must be in correct format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}/.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long, and include a combination of uppercase, lowercase, number, and symbol';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    }
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateFields()) {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      axiosMultipartInstance.post('/Studentreg', submitData)
        .then((response) => {
          console.log('Success:', response.data);
          toast.success(response.data.msg)
          navigate('/StudentLogin');

        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            toast.warning(error.response.data.msg)
          } else {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.')
          }
        });
    }
  };



  return (
    <>
      <div className="container stu_reg_container">
        <div className="row stu_login_main">
          <div className="col-3 stu_login_main_text">
            <FaArrowLeft size={40} onClick={goBack} />
          </div>
          <div className="col-9">
            <h1>REGISTER - STUDENT</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 reg_img">
              <img
                src={selectedImage}
                alt="Profile"
                className="img-fluid stu_reg_profile"
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
          <div className="row mt-4">
            <div className="col-6">
              <div>
                <label className="mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className={`stu_login_input_style form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className={`stu_login_input_style form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <div>
                <label className="mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className={`stu_login_input_style form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="mb-2">Gender</label>
                <select
                  name="gender"
                  className={`stu_login_input_style form-control ${errors.gender ? 'is-invalid' : ''}`}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <div>
                <label className="mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  className={`stu_login_input_style form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
                {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
              </div>
            </div>
            <div className="col-6">
              <div>
                <label className="mb-2">E-Mail</label>
                <input
                  type="text"
                  name="email"
                  className={`stu_login_input_style form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <div className="stu_password-input-wrapper">
                <label className="mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`stu_login_input_style form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {/* Conditionally render the icon if there's no password error */}
                {!errors.password && (
                  <span className="stu_password-toggle-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>

            <div className="col-6">
              <div className="stu_password-input-wrapper">
                <label className="mb-2">Confirm Password</label>
                <input
                  type={showPassword1 ? 'text' : 'password'}
                  name="confirmPassword"
                  className={`stu_login_input_style form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {/* Conditionally render the icon if there's no confirmPassword error */}
                {!errors.confirmPassword && (
                  <span className="stu_password-toggle-icon" onClick={togglePasswordVisibility1}>
                    {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
            </div>
          </div>


          <div className="stu_button-center mt-3">
            <button type="submit" className="btn btn-light mt-4 stu_login_button">REGISTER</button>
          </div>
          <div className="pt-4">
            <p className="stu_register_text">Already have an account? <Link to="/StudentLogin">Login Here</Link></p>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterStudent;
