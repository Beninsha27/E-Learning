import React, { useEffect, useState } from 'react';
import '../../Asserts/Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setdata] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("adminlog") != null) {
            navigate("/AdminHome")
        }
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };
    const handleLogin = () => {
        if (data.username === 'admin' && data.password === 'admin123') {
            localStorage.setItem("adminlog", 1);
            toast.success("Login Success !")
            window.location.reload()
        } else if (data.username != 'admin' || data.password != 'admin123') {
            toast.warning("Username or Password Incorrect !")
        }
        else {
            toast.error("Something went wrong !")
        }
    };

    return (
        <>
            <div className='container login_container'>
                <form onSubmit={handleLogin}>
                    <div className='login-form_sty'>
                        <div >
                            <label className='mb-2'>User Name :</label>
                            <input
                                type='text'
                                name='username'
                                className='login_input_style form-control'
                                value={data.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mt-4 mb-4'>
                            <label className='mb-2'>Password :</label>
                            <div className='password-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    className='login_input_style form-control'
                                    value={data.password}
                                    onChange={handleChange}
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