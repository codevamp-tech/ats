import React from "react";
import logoURL from "../assets/img/logo.jpeg";

export const Footer = () => {
  const footerNav = [ "Jobs", "Login", "Signup", "Post Job" ];

  return (
    <footer class="text-white bg-deepBlack shadow ">
      <div class="w-full  mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between ">
          <a
            href="/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src={ logoURL }
              className="rounded-full h-16"
              alt="Flowbite Logo"
            />
            <span class="self-center text-clearWhite text-2xl font-semibold whitespace-nowrap ">
              A T S
            </span>
          </a>
          <ul class="flex flex-wrap justify-center items-center mb-6 text-sm font-medium sm:mb-0 text-clearWhite">
            { footerNav.map( ( menu, key ) => {
              return (
                <li key={ key }>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    { menu }
                  </a>
                </li>
              );
            } ) }
          </ul>
        </div>
        <hr class="my-6 border-clearWhite sm:mx-auto lg:my-8" />
        <span class="block text-sm text-clearWhite sm:text-center ">
          © 2024{ " " }
          <a href="/" class="hover:underline">
            ATS
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
