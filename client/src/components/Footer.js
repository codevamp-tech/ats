import React from 'react'
import atslogo1URL from '../assets/img/atslogo1.jpg'

export const Footer = () => {
    const footerNav = [
        { name: "Jobs", url: "/my-jobs/" },
        { name: "Login", url: "/login" },
        { name: "Signup", url: "/signup" },
        { name: "Post Job", url: "/post-job" }
    ]

    return (
        <footer className="bg-deepBlack w-screen shadow">
            <div className="w-full mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={atslogo1URL} className="rounded-full h-16" alt="ATS Logo" />
                        <span className="self-center text-clearWhite font-semibold whitespace-nowrap">A T S</span>
                    </a>
                    <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-medium text-clearWhite sm:mb-0">
                        {footerNav.map((menu, key) => (
                            <li key={key}>
                                <a href={menu.url} className="hover:underline me-4 md:me-6">{menu.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-clearWhite sm:text-center">
                    © 2024 <a href="/" className="hover:underline">A T S</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}
