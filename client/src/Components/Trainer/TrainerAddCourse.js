import React, { useState } from 'react';
import { LuImagePlus } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axiosMultipartInstance from '../Constants/FornDataUrl';
import { toast } from 'react-toastify';

function TrainerAddCourse() {
  const trainerId = localStorage.getItem('logtrainerid');
  console.log(trainerId);

  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    trainerid: trainerId,
    date: '',
    category: '',
    description: '',
    cost: '',
    coverImage: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        coverImage: file,
      }));
      const reader = new FileReader();
      reader.onload = (event) => setSelectedImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    console.log({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = 'Title is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.title)) {
      newErrors.title = 'Title must contain only letters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (!formData.cost) {
      newErrors.cost = 'Cost is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.cost)) {
      newErrors.cost = 'Cost must be a valid number';
    }

    if (!formData.coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateFields()) {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      axiosMultipartInstance
        .post(`/addCourseById/${trainerId}`, submitData)
        .then((response) => {
          console.log('Success', response.data);
          toast.success(response.data.msg);
          navigate('/TrainerViewCourse');
        })
        .catch((error) => {
          if (error.response && error.response.status === 500) {
            toast.warning(error.response.data.msg);
          } else {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
          }
        });
    }
  };

  return (
    <>
      <div className="trainer_req_container">
        <p className="trainer_req_heading">
          View Course
          <Link className="trainer_req_link" to="/TrainerViewCourse">
            <FaArrowRight id="FaArrowRight" />
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="add-course_container">
          <div className="addcourse_img_container">
            {!selectedImage ? (
              <LuImagePlus
                className="img-fluid image_addcourse"
                onClick={handleImageClick}
              />
            ) : (
              <img
                src={selectedImage}
                alt="Selected"
                className="img-fluid image_addcourse"
                onClick={handleImageClick}
              />
            )}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {errors.coverImage && <div className="invalid-feedback">{errors.coverImage}</div>}
          </div>
          <div className="trainer_login-form_sty">
            <div>
              <label className="mb-2 mt-2">Title</label>
              <input
                type="text"
                name="title"
                className={`trainer_login_input_style form-control ${errors.title ? 'is-invalid' : ''}`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <label className="mb-2 mt-2">Category</label>
                <select
                  name="category"
                  className={`trainer_login_input_style form-control ${errors.category ? 'is-invalid' : ''}`}
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Programming">Programming</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Database Management">Database Management</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Networking">Networking</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Mobile Development">Mobile App Development</option>
                  <option value="Game Development">Game Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Others">Others</option>
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
              </div>
              <div className="col-6">
                <label className="mb-2 mt-2">Cost</label>
                <input
                  type="text"
                  name="cost"
                  className={`trainer_login_input_style form-control ${errors.cost ? 'is-invalid' : ''}`}
                  value={formData.cost}
                  onChange={handleChange}
                />
                {errors.cost && <div className="invalid-feedback">{errors.cost}</div>}
              </div>
            </div>
            <div>
              <label className="mb-2 mt-2">Description</label>
              <textarea
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            <div className="trainer_button-center">
              <button type="submit" className="btn btn-light mt-4 trainer_login_button">
                ADD COURSE
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default TrainerAddCourse;
