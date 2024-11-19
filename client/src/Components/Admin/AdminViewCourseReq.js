import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axiosInstance from '../Constants/Baseurl';
import { toast } from 'react-toastify';
import profile from '../../Asserts/Images/camera.jpg'


function AdminViewCourseReq() {
    const [course, setCourse] = useState([]);
    const url = axiosInstance.defaults.url;

    useEffect(() => {
        axiosInstance
            .post('/viewCourseReq')
            .then((res) => {
                console.log("API Response Data:", res.data);
                const courseList = res.data.data || [];
                setCourse(courseList);
            })
            .catch((err) => {
                console.error(err);
                setCourse([]);
            });
    }, []);

    const handleAccept = (id) => {
        axiosInstance
            .post(`approveCourseById/${id}`)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    toast.success("Approved Successfully");
                    fetchCourseReq();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleReject = (id) => {
        axiosInstance
            .post(`removeCourseById/${id}`)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    toast.success("Rejected Successfully");
                    fetchCourseReq();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const fetchCourseReq = () => {
        axiosInstance
            .post('/viewCourseReq')
            .then((res) => {
                console.log("Updated Trainer List:", res.data);
                const courseList = res.data.data || [];
                setCourse(courseList);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <div className='trainer_req_container'>

                <p className='trainer_req_heading'>View Course
                    <Link className='trainer_req_link' to='/AdminViewCourse'><FaArrowRight id='FaArrowRight' /></Link>
                </p>

            </div>
            <div className="course-card-container">
                {Array.isArray(course) && course.length ? (
                    course.map((data) => (
                        <div className="course_sub_container">

                            <div className='row' key={data._id}>
                                {/* <div className='col-4'> */}
                                <div className='h1-container'>
                                    <h1 className="table_header">{data?.title}</h1>
                                </div>
                                <div className='description_container'>
                                    <p>{data?.description}</p>
                                </div>
                                <img
                                    src={data?.coverImage?.filename ? `${url}/${data.coverImage.filename}` : profile}
                                    className="course-profile-image"
                                    alt="Profile"
                                />
                                {/* </div> */}
                                {/* <div className='col-8'> */}

                                <table className="table-style">

                                    <tbody>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Trainer Name</td>
                                            <td className="table-cell-value">{data?.trainerid?.name}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Category</td>
                                            <td className="table-cell-value">{data?.category}</td>
                                        </tr>
                                        <tr className="table-row">
                                            <td className="table-cell-label">Cost</td>
                                            <td className="table-cell-value">{data?.cost}/-</td>
                                        </tr>
                                        {/* <tr className="table-row">
                                                <td className="table-cell-label">Description</td>
                                                <td className="table-cell-value">{data?.description} Years</td>
                                            </tr> */}
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
                                {/* </div> */}
                            </div>
                        </div>

                    ))
                ) : (
                    <h1>No data Found!</h1>
                )}
            </div>
        </div>
    )
}

export default AdminViewCourseReq