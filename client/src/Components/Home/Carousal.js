import React from 'react'
import img1 from '../../Asserts/Images/educate.jpg'
import img2 from '../../Asserts/Images/educate-1.jpg'
import img3 from '../../Asserts/Images/educate-2.jpg'

function Carousal() {
    return (
        <>
            <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner p-2">
                    <div class="carousel-item active">
                        <img src={img1} class="d-block w-100 home_carousal_img" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5 className='abc'>BEST ONLINE COURSES</h5>
                            <h1 className='abc'>Best Online Learning <br />Platform</h1>
                            <p className='abc'>Welcome to E-Learning Unlock your potential with our interactive E-Learning platform.</p>
                            <div class="slider-btn">
                                <button class="btn btn-1">Read More</button>
                                <button class="btn btn-2">Join Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={img2} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5 className='abc'>BEST ONLINE COURSES</h5>
                            <h1 className='abc'>Best Online Learning <br />Platform</h1>
                            <p className='abc'>Welcome to E-Learning Unlock your potential with our interactive E-Learning platform.</p>
                            <div class="slider-btn">
                                <button class="btn btn-1">Read More</button>
                                <button class="btn btn-2">Join Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={img3} class="d-block w-100" alt="..." />
                        <div class="carousel-caption d-none d-md-block">
                            <h5 className='abc'>BEST ONLINE COURSES</h5>
                            <h1 className='abc'>Best Online Learning <br />Platform</h1>
                            <p className='abc'>Welcome to E-Learning Unlock your potential with our interactive E-Learning platform.</p>
                            <div class="slider-btn">
                                <button class="btn btn-1">Read More</button>
                                <button class="btn btn-2">Join Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Carousal