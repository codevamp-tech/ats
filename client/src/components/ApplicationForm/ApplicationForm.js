import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const ApplicationForm = ({ job, loginData, applicationTypesData }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            candidateID: "",
            jobID: "",
            applicationStatus: "",
            resume: null,
            contactInfo: "",
            experience: "",
            additionalDocuments: null,
            questions: [],
            answers: [],
        },
    });

    // Handle file
    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    console.log("jobbb", job, loginData);

    useEffect(() => {
        if (applicationTypesData?.applicationTypes) {
            const step1Status = applicationTypesData.applicationTypes.find(
                (status) => status.applicationStep === "1"
            );
            if (step1Status) {
                // This sets the form field to that status
                setValue("applicationStatus", step1Status.applicationStatus);
            }
        }
    }, [applicationTypesData, setValue]);

    // Form submission
    const onSubmit = async (data) => {
        // Check candidate login
        if (!loginData || loginData.role !== "candidate") {
            alert("You need to log in as a candidate to apply.");
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append("candidateID", loginData._id);
        formData.append("jobID", job._id);
        formData.append("applicationStatus", data.applicationStatus);
        formData.append("resume", file);
        formData.append("contactInfo", data.contactInfo);
        formData.append("experience", data.experience);
        formData.append("additionalDocuments", data.additionalDocuments);
        formData.append("questions", JSON.stringify(job.applicationForm.question));
        formData.append("answers", JSON.stringify(data.answers));

        try {
            const response = await fetch("http://localhost:8080/application/add-application", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();

            if (response.ok) {
                alert("Application submitted successfully!");
                navigate(`/application-details/${result.applicationID}`);
            } else {
                alert("Failed to submit application.");
            }
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Application Status */}
            {false && <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Application Status
                </label>
                <select
                    {...register("applicationStatus", { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Status</option>
                    {applicationTypesData?.applicationTypes?.map((status) => (
                        <option key={status._id} value={status.applicationStatus}>
                            {status.applicationStep}. {status.applicationStatus}
                        </option>
                    ))}
                </select>
                {errors.applicationStatus && (
                    <p className="text-red-500 text-sm mt-1">
                        Application status is required.
                    </p>
                )}
            </div>}

            {/* Resume */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Resume</label>
                <input
                    type="file"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Contact Info */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Contact Info
                </label>
                <input
                    type="text"
                    {...register("contactInfo")}
                    placeholder="Email or phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* Experience */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">
                    Relevant Experience
                </label>
                <textarea
                    {...register("experience")}
                    placeholder="Briefly describe your experience"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                ></textarea>
            </div>

            {/* Application Questions */}
            <div>
                <h2 className="text-xl font-semibold mb-3 border-b pb-2">
                    Application Questions
                </h2>
                {job.applicationForm.question.map((question, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            {question}
                        </label>
                        <textarea
                            {...register(`answers[${index}]`)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                        ></textarea>
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Apply Now
            </button>
        </form>
    );
};
