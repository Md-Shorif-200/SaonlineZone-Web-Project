import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFilter, FaMapMarkerAlt, FaSortAmountDown } from 'react-icons/fa';

const FindJobs = () => {
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('/AllJobs.json');
                setJobs(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="find_job p-4">
            
            <div className="section_heading bg-blue-200 p-4 rounded-tl-lg rounded-tr-lg">
                <div className="w-full rounded-md primary_text_color text-2xl font-semibold capitalize p-3 mb-4 bg-white overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap">
                        🚀 Discover the latest freelance tech jobs. Stay ahead in your career!
                    </div>
                </div>

                <div className="w-[50%] sm:w-[35%] lg:w-[25%] mx-auto my-6">
                    <button className="primary_btn w-full uppercase text-lg">
                        Paid Ads
                    </button>
                </div>
            </div>

            
            <div className="data_section bg-gray-50 px-6 lg:px-16 py-8">
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 mb-10">
                    <div className="filter_category">
                        <select defaultValue="Filter By Category" className="select select-info">
                            <option disabled>Filter By Category</option>
                            <option>React</option>
                            <option>Vue</option>
                            <option>Angular</option>
                        </select>
                    </div>

                    <div className="filter_location">
                        <select defaultValue="Filter By Location" className="select select-info">
                            <option disabled>Filter By Location</option>
                            <option>Remote</option>
                            <option>Dhaka</option>
                            <option>Chittagong</option>
                        </select>
                    </div>

                    <div className="sort_payment">
                        <select defaultValue="Sort By Payment" className="select select-info">
                            <option disabled>Sort by Payment</option>
                            <option>Low to High</option>
                            <option>High to Low</option>
                        </select>
                    </div>
                </div>

                
                <h1 className="capitalize font-semibold text-2xl mb-4 text-center">
                    Total Jobs: {jobs?.length || 0}
                </h1>

                {
                    jobs?.length ? (
                      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
    <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
                <th className="px-6 py-4 text-center">Sl.</th>
                <th className="px-6 py-4">💼 Job Title</th>
                <th className="px-6 py-4 text-center">📊 Progress</th>
                <th className="px-6 py-4 text-center">💰 Payment</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
            {jobs?.map((job, index) => (
                <tr
                    key={index}
                    className="hover:bg-blue-50 odd:bg-gray-50 transition-colors duration-200"
                >
                    <td className="px-6 py-4 text-center font-medium text-gray-600">
                        {index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-semibold">
                        {job?.jobTitle}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-gray-600">
                                {job?.progress?.current} of {job?.progress?.total}
                            </span>
                            <progress
                                className="progress progress-info w-40 h-2"
                                value={job?.progress?.current}
                                max={job?.progress?.total}
                            ></progress>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-center text-green-600 font-medium">
                        ${job?.payment}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

                    ) : (
                        <div className="text-center py-20 text-gray-500 text-lg">
                            No job listings available.
                        </div>
                    )
                }
            </div>

            
            <style>{`
                .animate-marquee {
                    animation: marquee 15s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </div>
    );
};

export default FindJobs;
