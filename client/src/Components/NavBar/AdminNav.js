import React from 'react'
import logo from '../../Asserts/Images/Logo.png'
import '../../Asserts/Styles/Home.css'
import { Link, useNavigate } from 'react-router-dom'

function AdminNav() {
    const navigate = useNavigate()
    const logout=()=>{
        localStorage.clear()
        alert("Loged out")
        navigate('/')
    }
    return (
        <>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light home_nav_main">
                    <div class="container-fluid">
                        <a class="navbar-brand">
                            <img src={logo} alt="Logo" class="d-inline-block align-text-top img-fluid main_logo_style" />
                        </a>

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>


                        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul class="navbar-nav ">
                                <li class="nav-item p-2">
                                    <Link class="nav-link nav_text_style" to="/AdminHome">HOME</Link>
                                </li>
                                <li class="nav-item p-2">
                                    <Link class="nav-link nav_text_style" to="/AdminViewStudent">STUDENTS</Link>
                                </li>
                                <li class="nav-item p-2">
                                    <Link class="nav-link nav_text_style" to="/AdminViewTrainers">TRAINERS</Link>
                                </li>
                                <li class="nav-item p-2">
                                    <Link class="nav-link nav_text_style" to="/AdminViewCourse">COURSES</Link>
                                </li>
                                <li class="nav-item p-2">
                                    <Link class="nav-link nav_text_style" to="">PARENTS</Link>
                                </li>
                                <li class="nav-item p-2">
                                    <button class="nav-link nav_text_style" onClick={logout}>LOGOUT</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default AdminNav