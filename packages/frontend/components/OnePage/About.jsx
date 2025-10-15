import Image from 'next/image';
import React from 'react';
import appData from "@/data/app-data";

function About() {
  return (
    <section id={'about'} className='about section-padding'>
      <div className='container'>
        <div className='row md-marg'>
          <div className='col-lg-6 valign'>
            <div className='cont md-mb50'>
              <h6 className='sub-title opacity-8 wow fadeInUp'>About Us.</h6>
              <h2
                className='d-slideup wow'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}>
                <span className='sideup-text'>
                  <span className='up-text'>We bring together two worlds</span>
                </span>
                <span className='sideup-text'>
                  <span className='up-text'><span className='sub-font'> privacy and digital design </span></span>
                </span>
                <span className='sideup-text'>
                  <span className='up-text'>to help companies grow <span className='sub-font'>safely</span> and <span className='sub-font'>smartly</span></span>
                </span>
              </h2>
            </div>
          </div>
          <div className='col-lg-6'>
            <div
              className='img'
              style={{
                borderRadius: '8px',
                boxShadow: '-19px 24px 15px -3px rgba(0,0,0,0.1)'
              }}
            >
              <Image
                src={appData.about.img}
                alt='alt'
                width={500}
                height={500}
                style={{
                  borderRadius: '8px',
                  transform: 'scaleX(-1)'
              }}
              />
              <div className='exp main-bg'>
                <h2>{appData.about.year}</h2>
                <h6 className='sub-title'>Created in</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
