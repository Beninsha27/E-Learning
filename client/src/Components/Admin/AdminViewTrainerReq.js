import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/Baseurl';
import profile from '../../Asserts/Images/profile.jpg'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { toast } from 'react-toastify';

function AdminViewTrainerReq() {
    const [trainers, setTrainers] = useState([]);
    const url = axiosInstance.defaults.url;

    useEffect(() => {
        axiosInstance
            .post('/ViewAllTrainersReq')
            .then((res) => {
                console.log("API Response Data:", res.data);
                const trainersList = res.data.data || [];
                setTrainers(trainersList);
            })
            .catch((err) => {
                console.error(err);
                setTrainers([]);
            });
    }, []);

    const handleAccept = (id) => {
        axiosInstance
            .post(`ApproveTrainerById/${id}`)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    toast.success("Approved Successfully");
                    fetchTrainers();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleReject = (id) => {
        axiosInstance
            .post(`RejectTrainerById/${id}`)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    toast.success("Rejected Successfully");
                    fetchTrainers();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const fetchTrainers = () => {
        axiosInstance
            .post('/ViewAllTrainersReq')
            .then((res) => {
                console.log("Updated Trainer List:", res.data);
                const trainersList = res.data.data || [];
                setTrainers(trainersList);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <div className="trainer_req_container">
                <p className="trainer_req_heading">
                    View All Trainers
                    <Link className="trainer_req_link" to="/AdminViewTrainers">
                        <FaArrowRight id="FaArrowRight" />
                    </Link>
                </p>
            </div>
            <div className="students-container">
                {Array.isArray(trainers) && trainers.length ? (
                    trainers.map((data) => (
                        <div key={data._id} className="admin_view_trainers">
                            <img
                                src={data?.profile?.filename ? `${url}/${data.profile.filename}` : profile}
                                className="profile-image"
                                alt="Profile"
                            />
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
                                        <td className="table-cell-label">Qualification</td>
                                        <td className="table-cell-value">{data?.qualification}</td>
                                    </tr>
                                    <tr className="table-row">
                                        <td className="table-cell-label">Experience</td>
                                        <td className="table-cell-value">{data?.experiance} Years</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button
                                                type="submit"
                                                className="trainer_req_button approve_button"
                                                onClick={() => handleAccept(data?._id)}
                                            >
                                                Approve
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="submit"
                                                className="trainer_req_button reject_button"
                                                onClick={() => handleReject(data?._id)}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <h1>No data Found!</h1>
                )}
            </div>
        </div>
    );
}


export default AdminViewTrainerReq