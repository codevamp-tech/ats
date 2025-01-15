import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import 'boxicons';
import logoURL from '../assets/img/logo.jpeg';

const adminNavItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Users', path: '/all-users' },
    { label: 'Application Types', path: '/application-types' },
    { label: 'Interview Rounds', path: '/interview-rounds' },
];

const employerNavItems = [
    { label: 'Home', path: '/' },
    { label: 'Post Job', path: '/post-job' },
    { label: 'Dashboard', path: '/all-jobs' },
    { label: 'Candidates', path: '/shortlist' },
];
const coordinatorNavItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/coordinator/review' },
    { label: 'Candidates', path: '/shortlist' }
];
const recruiterNavItems = [
    { label: 'Home', path: '/recruiter-dashboard' },
    { label: 'Jobs', path: '/all-jobs' }
];
const candidateNavItems = [
    { label: 'Home', path: '/' },
    { label: 'All Jobs', path: '/all-posted-jobs' },
    { label: 'Dashboard', path: `/my-jobs` }
];
const normalNavItem = [
    { label: 'Home', path: '/' },
    { label: 'All Jobs', path: '/all-posted-jobs' },
];

export const Navbar = () => {
    const [loginData, setLoginData] = useState(null);
    const [navItems, setNavItems] = useState(normalNavItem); // Default navItems if not logged in
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle hamburger menu
    const handlerIsMenuOpen = () => setIsMenuOpen(!isMenuOpen);

    console.log("navItems>>>", navItems);

    // Check localStorage for token and update loginData
    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token) {
            const user = JSON.parse(token);
            setLoginData(user); // Set login data when token exists
        }
    }, []); // Empty dependency array ensures this runs on initial mount

    console.log("loginData>>", loginData?.role);

    // Update navItems based on loginData
    useEffect(() => {
        if (loginData) {
            switch (loginData.role) {
                case 'admin':
                    setNavItems(adminNavItems);
                    break;
                case 'employer':
                    setNavItems(employerNavItems);
                    break;
                case 'coordinator':
                    setNavItems(coordinatorNavItems);
                    break;
                case 'recruiter_manager':
                    setNavItems(recruiterNavItems);
                    break;
                case 'candidate':
                    setNavItems(candidateNavItems);
                    break;
                default:
                    setNavItems(normalNavItem);
            }
        } else {
            setNavItems(normalNavItem); // Set to normal items when not logged in
        }
    }, [loginData]); // This will re-run when loginData changes

    // Logout handler
    const logoutHandler = async () => {
        await fetch('http://localhost:8080/auth/logout', {
            method: "POST",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setLoginData(null);
                    localStorage.removeItem("usertoken");
                    localStorage.removeItem("user");
                    window.location.href = "/";
                }
            });
    };

    return (
        <div className='max-w-screen container mx-auto xl:px-24 px-4'>
            <nav className='flex justify-between items-center py-6'>
                {/* BRAND */}
                <NavLink to='/' className='flex items-center gap-2 text-2xl text-[#087658]'>
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={logoURL} className="rounded-full h-12 md:h-16" alt="Flowbite Logo" />
                    </a>
                    <span className='font-extrabold text-xl md:text-3xl'>humgrow.com</span>
                </NavLink>

                {/* MAIN MENU - Lg device */}
                <ul className="hidden md:flex gap-12 font-bold">
                    {navItems.map(({ label, path }) => (
                        <li key={path} className='text-base text-primary'>
                            <NavLink
                                to={path}
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* User info or Login/Signup */}
                <div>
                    {loginData ? (
                        <div className='hidden md:block'>
                            <div className='grid grid-cols-2 items-center gap-4'>
                                Hello, {loginData.userName}
                                <div onClick={logoutHandler} className='py-2 px-5 text-center border-2 bg-gray-200 cursor-pointer rounded'>Logout</div>
                            </div>
                        </div>
                    ) : (
                        <div className='text-base text-primary font-medium space-x-5 hidden md:block'>
                            <Link to="/login" className='py-2 px-5 border rounded bg-gray-100'>Login</Link>
                            <Link to="/signup" className='bg-secondary text-white py-2 px-5 border rounded'>Sign Up</Link>
                        </div>
                    )}
                </div>

                {/* HAMBURGER MENU */}
                <div className="text-primary md:hidden flex justify-end items-center gap-2">
                    <box-icon name={isMenuOpen ? "x" : "menu"} size="md" color="text-primary" onClick={handlerIsMenuOpen}></box-icon>
                </div>
            </nav>

            {/* MAIN MENU sm device */}
            <div className={` ${isMenuOpen ? "" : "hidden"} font-bold px-4 bg-gray-200 py-5 rounded`}>
                <ul className="md:hidden sm:flex flex-col">
                    {isMenuOpen && navItems.map(({ label, path }) => (
                        <li key={path} className='text-base text-primary first:text-black py-1'>
                            <NavLink
                                to={path}
                                className={({ isActive }) => isActive ? "active" : ""}
                            >
                                <span onClick={() => setIsMenuOpen(!isMenuOpen)}>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                    {/* Login/signup sm-device */}
                    <div>
                        {loginData ? (
                            <div onClick={logoutHandler} className='py-2 px-5 border rounded'>Logout</div>
                        ) : (
                            <li onClick={() => setIsMenuOpen(!isMenuOpen)}><Link to="/login" className='py-1 text-primary'>Login</Link></li>
                        )}
                    </div>
                </ul>
            </div>

            <Outlet />
        </div>
    );
};
