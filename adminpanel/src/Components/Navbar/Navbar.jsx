import React from 'react';
import './Navbar.css'
import {assets} from "../../assets/assets.js";

const Navbar = () => {
    return (
        <div>
            <section className="navbar-area navbar-one">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg">
                                <a className="navbar-brand" href="#">
                                    <img src={assets.logo} alt="Logo" height={55} width={55}/>
                                </a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarOne"
                                    aria-controls="navbarOne"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse sub-menu-bar" id="navbarOne">
                                    <ul className="navbar-nav m-auto">
                                        <li className="nav-item">
                                            <a
                                                className="page-scroll active"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#sub-nav1"
                                                aria-controls="sub-nav1"
                                                aria-expanded="false"
                                                aria-label="Toggle navigation"
                                                href="#"
                                            >
                                                About
                                                <div className="sub-nav-toggler">
                                                    <span><i className="lni lni-chevron-down"></i></span>
                                                </div>
                                            </a>
                                            <ul className="sub-menu collapse" id="sub-nav1">
                                                <li><a href="#">About Us</a></li>
                                                <li>
                                                    <a
                                                        className="page-scroll"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#sub-nav2"
                                                        aria-controls="sub-nav2"
                                                        aria-expanded="false"
                                                        aria-label="Toggle navigation"
                                                        href="#"
                                                    >
                                                        Our Portfolio
                                                        <div className="sub-nav-toggler">
                                                            <span><i className="lni lni-chevron-down"></i></span>
                                                        </div>
                                                    </a>
                                                    <ul className="sub-menu collapse" id="sub-nav2">
                                                        <li>
                                                            <a href="#">Portfolio Style 1</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Portfolio Style 2</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Portfolio Style 3</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Our Teams</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <a>Services</a>
                                        </li>
                                        <li className="nav-item">
                                            <a>Resources</a>
                                        </li>
                                        <li className="nav-item">
                                            <a>Support</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="navbar-btn">
                                    <ul>
                                            <a className="btn btn-primary gap-4" href="#"
                                            >Sign In</a
                                            >
                                            <a className="btn primary-btn" href="#"
                                            >Sign Up</a
                                            >
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Navbar
