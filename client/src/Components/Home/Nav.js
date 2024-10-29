import React from 'react'
import logo from '../../Asserts/Images/Logo.png'
import '../../Asserts/Styles/Trainer.css'
import { Link } from 'react-router-dom'

function Nav() {
  return (
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
              <div className="nav-item dropdown p-2">
                <a
                  href="#"
                  className="nav-link dropdown-toggle nav_text_style"
                  id="loginDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  LOGIN
                </a>
                <ul className="dropdown-menu m-0" aria-labelledby="loginDropdown">
                  <li>
                    <Link to='/StudentLogin' className="dropdown-item nav_text_style" >
                      Student
                    </Link>
                  </li>
                  <li>
                    <Link to='/TrainerLogin' className="dropdown-item nav_text_style">
                      Trainer
                    </Link>
                  </li>
                  <li>
                    <Link to='/ParentLogin' className="dropdown-item nav_text_style">
                      Parent
                    </Link>
                  </li>
                </ul>
              </div>
              <li class="nav-item p-2">
                <Link class="nav-link nav_text_style" to="/">HOME</Link>
              </li>
              <li class="nav-item p-2">
                <Link class="nav-link nav_text_style" to="/about">ABOUT US</Link>
              </li>
              {/* <li class="nav-item p-2">
                <Link class="nav-link nav_text_style" to="/contact">CONTACT US</Link>

              </li> */}
              {/* <li class="nav-item p-2">
                <Link class="nav-link nav_text_style" to="/login">LOGIN</Link>

              </li> */}


              {/* <div className="nav-item dropdown  p-2">
                <a
                  href="#"
                  className="nav-link dropdown-toggle nav_text_style"
                  id="registerDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  REGISTER
                </a>
                <ul className="dropdown-menu m-0" aria-labelledby="registerDropdown">
                  <li>
                    <a className="dropdown-item nav_text_style">
                      Student
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item nav_text_style">
                      Trainer
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item nav_text_style">
                      Parent
                    </a>
                  </li>
                </ul>
              </div> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav