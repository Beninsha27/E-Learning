import React, { useState } from 'react'
import '../../Asserts/Styles/Login.css'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className='container login_container'>
                <form>
                    <div className='login-form_sty'>
                        <div className=''>
                            <label className='mb-2'>E-mail</label>
                            <input type='email' className='login_input_style form-control' />
                        </div>
                        <div className='mt-4'>
                            <label className='mb-2'>Password</label>
                            <div className='password-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='login_input_style form-control'
                                />
                                <span className='password-toggle-icon' onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <p className='forgot-text pt-2'>Forgot Password ?</p>
                        </div>
                        <div className='button-center'>
                            <button type="button" class="btn btn-light mt-4 login_button">LOGIN</button>
                        </div>
                        <div className='p-4'>

                            <p className='register_text'>Dont have an account ? <Link to=''>Register Here</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login