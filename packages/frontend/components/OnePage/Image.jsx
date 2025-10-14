import React, { useEffect } from 'react';
//= Scripts
import parallaxie from '@/common/parallaxie';
import useIsMobile from "@/hooks/useIsMobile";

function Image() {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    parallaxie('.back-image.parallaxie', 0.8, undefined, isMobile);
  }, []);

  return (
    <div className="back-image states bg-img parallaxie" data-background="/assets/images/hero_3.jpg"
      data-overlay-dark="3">
      <div className="container box position-re">
        <ul className="rest">
          <li className="sd-dark">
            <span className="numb">5920</span>
            <h5>Succeeded <br /> Projects</h5>
          </li>
          <li className="blur">
            <h5>
              Huge template <br /> collection.</h5>
            <span className="icon pe-7s-paper-plane"></span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Image
