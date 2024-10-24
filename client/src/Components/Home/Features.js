import React from 'react'
import '../../Asserts/Styles/Home.css'
import { FaGraduationCap } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { IoBook } from "react-icons/io5";

function Features() {
    return (
        <div className='m-5 features_main_div'>
            <div className='row'>
                <div className='col-md-4  '>
                    <div className='features_sub_div'>
                        <FaGraduationCap className='features_icon' />
                        <h3>Meet Your Skilled <br /> Instructor</h3>
                        <p>Meet skilled instructors who bring a wealth of knowledge and practical experience to their teaching.
                            They offer expert guidance, personalized support, and innovative methods to enhance learning.
                            Their dedication ensures that students gain valuable insights and develop essential skills effectively.</p>
                    </div>
                </div>
                <div className='col-md-4 '>
                    <div className='features_sub_div'>
                        <FaGlobe className='features_icon' />
                        <h3>Online Classes</h3>
                        <p>Online classes offer flexible and convenient learning opportunities from anywhere with an internet connection.
                            They provide access to expert instructors and a wide range of resources, allowing students to learn at their own pace and on their own schedule.
                            Interactive tools and virtual classrooms facilitate engagement and collaboration, making education accessible and adaptable to individual needs.</p>
                    </div>
                </div>
                <div className='col-md-4 '>
                    <div className='features_sub_div'>
                        <IoBook className='features_icon' />
                        <h3>24/7 Access <br /> to Course Materials</h3>
                        <p>Learners can review and study content anytime, from anywhere.
                            This constant availability supports flexible learning schedules and accommodates different time zones and personal commitments.
                            It empowers students to revisit lectures, assignments, and resources at their convenience, enhancing their understanding and retention of the material.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features