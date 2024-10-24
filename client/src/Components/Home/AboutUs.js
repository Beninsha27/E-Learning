import React from 'react'
import About from '../../Asserts/Images/port.jpg'

function    AboutUs() {
  return (
    <>
        <div className='row m-5'>
            <div className='col-md-5'>
                <img src={About} className='img-fluid'/>
            </div>
            <div className='col-md-7'>
                <span className='aboutus_main_text'>LEARN ANYTHING</span>
                <h2  className='pt-3'>Benifits About Online <br/> Learning Expertise</h2>
                <div className='about_content'>
                    <h3>Quality Content</h3>
                    <p className='aboutus_p'>Quality content is engaging, informative, and relevant, providing clear value to its audience. 
                        It is well-researched, accurate, and tailored to meet the needs and interests of the target readers. 
                        Additionally, it is presented in a clear, compelling manner with attention to detail in grammar and style. 
                        Effective quality content drives user interaction and builds trust with the audience.</p>
                </div>
                <div className='about_content'>
                    <h3>Expert Instructors</h3>
                    <p className='aboutus_p'>An expert instructor delivers comprehensive, accurate knowledge with clarity and authority. 
                        They engage students through interactive, tailored teaching methods, fostering a deep understanding of the subject.
                         Their passion and expertise inspire and motivate learners to achieve their full potential.</p>
                </div>
                <div className='about_content'>
                    <h3>Flexibility and Conveniance</h3>
                    <p className='aboutus_p'>Flexibility and convenience offer users the ability to adapt their schedules and preferences to fit their needs seamlessly. 
                        This approach minimizes disruptions by allowing adjustments in timing and location. 
                        Overall, it promotes a more efficient and personalized experience.</p>
                </div>
                <div className='about_content'>
                    <h3>Supportive Community</h3>
                    <p className='aboutus_p'>A supportive community fosters a nurturing environment where members share knowledge, encouragement, and resources. 
                        It provides emotional support and constructive feedback, helping individuals grow and overcome challenges.
                         Collaboration and mutual respect are key, creating a space where everyone feels valued and motivated to contribute.</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default AboutUs