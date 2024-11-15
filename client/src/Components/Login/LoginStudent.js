import React, { useEffect, useState } from 'react'
import '../../Asserts/Styles/Students.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from '../Constants/Baseurl';
import { toast } from 'react-toastify';

function LoginStudent() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        console.log({...data, [name]: value });
    };
    

    // useEffect(() => {
    //     if (localStorage.getItem("logstudentid") != null) {
    //         navigate("/StudentHome");
    //     }
    // });

    const handleLogin = (e) => {
        e.preventDefault();

        axiosInstance.post('/Studentlogin', data)
            .then((response) => {
                console.log('Success:', response);

                // Save the student ID to localStorage
                localStorage.setItem("logstudentid", response.data.id);
                console.log(response.data.id);

                // Display login success notification
                toast.success('Logged in successfully');
                navigate('/StudentHome');
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    toast.warning('Email not found');
                } else if (error.response && error.response.status === 401) {
                    toast.warning('Incorrect password');
                } else {
                    console.error('Error:', error);
                    toast.error('An error occurred. Please try again.');
                }
            });

    };



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
                        <FaArrowLeft size={40} onClick={goback} />
                    </div>
                    <div className='col-10 '>
                        <h1>LOGIN - STUDENT</h1>
                    </div>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="stu_login-form_sty">
                        <div>
                            <label className="mb-2">E-mail</label>
                            <input type="email" className="stu_login_input_style form-control" name='email' onChange={handleChange} />
                        </div>
                        <div className="mt-4">
                            <label className="mb-2">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="stu_login_input_style form-control"
                                    name='password'
                                    onChange={handleChange}
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p className="stu_forgot-text pt-2">Forgot Password?</p>
                        </div>
                        <div className="stu_button-center">
                            <button type="submit" className="btn btn-light mt-4 stu_login_button">LOGIN</button>
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

// import React, { useState } from 'react';
// import '../../Asserts/Styles/Students.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
// import axios from 'axios';

// function LoginStudent() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [data, setdata] = useState({
//         email: "",
//         password: "",
//       });
//     const navigate = useNavigate();

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const goback = () => {
//         navigate(-1);
//     };

//     // Handle input changes for email and password
//     const handleChange = (e) => {
//         setdata({ ...data, [e.target.name]: e.target.value });
//         console.log(data);
//     };

//     useEffect(() => {
//         if (localStorage.getItem("logstudentid") != null) {
//         //   mainnavigate("/home");
//         }
//       });

//     const handleLogin = (e) => {
//         e.preventDefault();
//         axiosInstance
//             .post("/loginStudent", data)
//             .then((res) => {
//                 if (res.status === 200) {
//                     // Store user ID in localStorage and display success alert
//                     localStorage.setItem("logstudentid", res.data.user._id);
//                     alert("Logged in successfully");
//                     navigate('/StudentDashboard'); // Navigate to the dashboard
//                 } else {
//                     setErrorMessage("Error. Please try again.");
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//                 setErrorMessage("Something went wrong. Please try again.");
//             });
//     };

//     return (
//         <>
//             <div className="container stu_login_container">
//                 <div className='row stu_login_main'>
//                     <div className='col-2 stu_login_main_text'>
//                         <FaArrowLeft size={40} onClick={goback} />
//                     </div>
//                     <div className='col-10'>
//                         <h1>LOGIN - STUDENT</h1>
//                     </div>
//                 </div>

//                 <form onSubmit={handleLogin}>
//                     <div className="stu_login-form_sty">
//                         <div>
//                             <label className="mb-2">E-mail</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className="stu_login_input_style form-control"
//                                 value={email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="mt-4">
//                             <label className="mb-2">Password</label>
//                             <div className="password-input-wrapper">
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     name="password"
//                                     className="stu_login_input_style form-control"
//                                     value={password}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </span>
//                             </div>
//                             <p className="stu_forgot-text pt-2">Forgot Password?</p>
//                         </div>
//                         {errorMessage && <p className="error-message mt-3">{errorMessage}</p>}
//                         <div className="stu_button-center">
//                             <button type="submit" className="btn btn-light mt-4 stu_login_button">LOGIN</button>
//                         </div>
//                         <div className="pt-4">
//                             <p className="stu_register_text">Don't have an account? <Link to="/StudentReg">Register Here</Link></p>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }

// export default LoginStudent;
