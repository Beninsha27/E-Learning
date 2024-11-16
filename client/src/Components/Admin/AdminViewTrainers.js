import React, { useEffect, useState } from 'react';
import axiosInstance from '../Constants/Baseurl';
import profile from '../../Asserts/Images/profile.jpg'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

function AdminViewTrainers() {
    const [trainers, setTrainers] = useState([]);
    const url = axiosInstance.defaults.url;
    console.log("Base URL:", url);

    useEffect(() => {
        axiosInstance
            .post('/ViewAllTrainers')
            .then((res) => {
                console.log(res);
                setTrainers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formatDateOfBirth = (dob) => {
        if (!dob) return ''; // Handle undefined or null DOB
        const dateObj = new Date(dob);
        const day = dateObj.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
        const month = dateObj.toLocaleString('en-US', { month: 'short' }); // Short month name
        const year = dateObj.getFullYear(); // Full year
        return `${day} ${month} ${year}`;
    };

    return (
        <>
            <div className='trainer_req_container'>

                <p className='trainer_req_heading'>View Trainer Request
                    <Link className='trainer_req_link' to='/AdminViewTrainersReq'><FaArrowRight id='FaArrowRight' /></Link>
                </p>

            </div>
            <div className="students-container">
                {trainers && trainers.length ? (
                    trainers.map((data) => {
                        return (
                            <div className="admin-view-students">
                                <img src={data?.profile?.filename ? `${url}/${data.profile.filename}` : profile} className="profile-image" alt="Profile" />
                                <table className="table-style">
                                    <tbody>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Name</td>
                                            <td className="table-cell-value">{data?.name}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Course</td>
                                            <td className="table-cell-value">{data?.course}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Gender</td>
                                            <td className="table-cell-value">{data?.gender}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Date of Birth</td>
                                            <td className="table-cell-value">{formatDateOfBirth(data?.dateOfBirth)}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell-label">qualification</td>
                                            <td className="table-cell-value">{data?.qualification}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Experiance</td>
                                            <td className="table-cell-value">{data?.experiance} Years</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Phone</td>
                                            <td className="table-cell-value">{data?.mobile}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Email</td>
                                            <td className="table-cell-value">{data?.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    })
                ) : (

                    // <div className="no_data_animation">
                    //       <Lottie
                    //         animationData={nodata}
                    //         className="no_data_animation"
                    //       />
                    //     </div>
                    <h1>No data Found !</h1>
                )}
            </div>
        </>
    )
}

export default AdminViewTrainers