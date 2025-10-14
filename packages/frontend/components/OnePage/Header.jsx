import React, {useEffect} from 'react';
//= Scripts
import parallaxie from '@/common/parallaxie';
import RotatingCTA from '@/components/Common/RotatingCTA'
import appData from '@/data/app-data';

function Header() {
  useEffect(() => {
    parallaxie(`header.parallaxie`, 0.15, 0);
  }, []);

  return (
    <header className='header-main full-height valign bg-img parallaxie' data-background='assets/images/hero_2.jpg'
            data-overlay-dark='7'>
      <div className='container ontop'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='caption'>
              <h5 className='fw-300 mb-15'>{appData.website.hero.title}</h5>
              <h1 className='fz-80'>{appData.website.hero.subtitle}</h1>
            </div>
          </div>
          <div className='col-lg-4 d-flex align-items-end justify-content-end justify-end'>
            <div className='d-flex align-items-center'>
              <RotatingCTA  href={appData.website.hero.cta.href} label={appData.website.hero.cta.title}/>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
