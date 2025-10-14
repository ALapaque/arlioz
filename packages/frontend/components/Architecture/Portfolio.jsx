import React from 'react';
//= Data
import data from '@/data/OnePage/portfolio.json';
import Link from 'next/link'
import Image from 'next/image';

function Portfolio() {
  return (
    <section id={'projects'} className='portfolio sub-bg section-padding'>
      <div className='container'>
        <div className='sec-leter-head mb-80'>
          <div className='d-flex align-items-center'>
            <div className='leter'>
              <h4>P</h4>
            </div>
            <div className='line'></div>
          </div>
          <div className='title'>
            <h6 className='sub-title'>Portfolio.</h6>
          </div>
        </div>
        <div className='row justify-content-center'>
        {data.map((project, index) => (
            <div className='col-lg-5 valign' key={index}>
              <div className='item md-mb80'>
                <Link href={{pathname: '/project/[slug]', query: { slug: encodeURIComponent(project.title)} }}>
                  <div className='o-hidden'>
                    <div className='img imago wow'>
                      <Image
                        loading={'eager'}
                        src={project.image}
                        alt={project.title}
                        width={500}
                        height={500}
                        style={{
                          aspectRatio: '1/1',
                          objectFit: 'cover'
                        }}
                        />
                    </div>
                  </div>
                  <div className='cont mt-30 mb-20 d-flex'>
                    <div>
                      <h6 className='line-height-1'>{project.title}</h6>
                      <p>{project.type}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
