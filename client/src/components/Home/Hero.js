import React from "react";
// import { OurCompanies } from "./OurCompanies";
// import { FeaturedJobs } from "./FeaturedJobs";
import Particles from "../Login/Particles";

export const Hero = () => {
  return (
    <div className="">
      {/* Add ParticlesComponent as the background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Particles />
      </div>
      <div className=" md:block p-0 absolute object-cover -z-100">
        {/* <img src={require('../images/hero.jpg')} alt='hero' className='w-full */}
        <img src={require("../../assets/img/banner_1.png")} alt="hero" />
      </div>
      <div className="max-w-screen-2xl container mx-auto px-4 md:py-8 py-2">
        <div className="grid my-32 md:grid-cols-2 gap-4 justify-center items-center h-[60.5vh]">
          <div>
            <h1 className="text-5xl font-bold text-clearWhite mb-3">
              Find your job today!
            </h1>
            <p className="text-lg text-clearWhite mb-8">
              Lorem ipsum lorem ipsum lorem ipsum
            </p>
            <button className="bg-deepBlack text-white py-3 px-12 rounded-md">
              Get Started
            </button>
          </div>
        </div>
        {/* <OurCompanies /> */}
        {/* <FeaturedJobs /> */}
      </div>
    </div>
  );
};
