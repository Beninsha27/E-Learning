import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../../Asserts/Styles/Trainer.css'


function TrainerViewCourse() {
  return (
    <div>
      <div className="trainer_req_container">
        <p className="trainer_req_heading">
          Add Course
          <Link className="trainer_req_link" to="/TrainerAddCourse">
            <FaArrowRight id="FaArrowRight" />
          </Link>
        </p>
      </div>
    </div>
  )
}

export default TrainerViewCourse