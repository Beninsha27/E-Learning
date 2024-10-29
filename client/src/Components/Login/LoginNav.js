import React from 'react'
import logo from '../../Asserts/Images/Logo.png'
import '../../Asserts/Styles/Home.css'

function LoginNav() {
    return (
        <>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light home_nav_main">
                    <div class="container-fluid">
                        <a class="navbar-brand">
                            <img src={logo} alt="Logo" class="d-inline-block align-text-top img-fluid main_logo_style" />
                        </a>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default LoginNav