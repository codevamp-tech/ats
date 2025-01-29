// import React, { useState } from "react";

// const ProfileEditForm = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         profilePicture: null,
//     });

//     const [imagePreview, setImagePreview] = useState(null);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData((prevData) => ({ ...prevData, profilePicture: file }));
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Form submitted:", formData);
//     };

//     return (
//         <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-xl">
//             {/* Profile Header */}
//             <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl p-8 text-center">
//                 <div className="relative mx-auto w-32 h-32 mb-4">
//                     <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
//                         {imagePreview ? (
//                             <img
//                                 src={imagePreview}
//                                 alt="Profile"
//                                 className="w-full h-full object-cover"
//                             />
//                         ) : (
//                             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                                 {/* Camera Icon */}
//                                 <div className="w-12 h-12 flex justify-center items-center bg-gray-400 rounded-full text-white">
//                                     <div className="relative w-6 h-6">
//                                         <div className="absolute inset-0 rounded-full bg-white scale-75"></div>
//                                         <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     <label
//                         htmlFor="profilePicture"
//                         className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors"
//                     >
//                         {/* Smaller Camera Icon */}
//                         <div className="w-5 h-5 flex justify-center items-center bg-white rounded-full text-blue-500">
//                             <div className="relative w-4 h-4">
//                                 <div className="absolute inset-0 rounded-full bg-blue-500 scale-75"></div>
//                                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
//                             </div>
//                         </div>
//                         <input
//                             type="file"
//                             id="profilePicture"
//                             name="profilePicture"
//                             onChange={handleFileChange}
//                             className="hidden"
//                             accept="image/*"
//                         />
//                     </label>
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">Edit Your Profile</h2>
//             </div>

//             {/* Form Section */}
//             <form onSubmit={handleSubmit} className="p-8 space-y-6">
//                 {/* Name Input */}
//                 <div className="space-y-2">
//                     <label
//                         htmlFor="name"
//                         className="text-sm font-medium text-gray-700 block"
//                     >
//                         Full Name
//                     </label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="Enter your name"
//                         required
//                     />
//                 </div>

//                 {/* Email Input */}
//                 <div className="space-y-2">
//                     <label
//                         htmlFor="email"
//                         className="text-sm font-medium text-gray-700 block"
//                     >
//                         Email Address
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="Enter your email"
//                         required
//                     />
//                 </div>

//                 {/* Password Input */}
//                 <div className="space-y-2">
//                     <label
//                         htmlFor="password"
//                         className="text-sm font-medium text-gray-700 block"
//                     >
//                         Password
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         placeholder="Enter new password"
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-4">
//                     <button
//                         type="submit"
//                         className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                     >
//                         Save Changes
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ProfileEditForm;
