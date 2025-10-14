import React, {useEffect} from 'react';
import styled from '@emotion/styled';

const Dot = styled.span`
  font-size: 1.5rem;
`;

const Loader = ({ delayed = true, projectName }) => {
  useEffect(() => {
    const tl = gsap.timeline();
    const svg = document.getElementById('svg');
    const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
    const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';

    tl.to('.loader-wrap-heading .load-text , .loader-wrap-heading', {
      delay: delayed ? 1.5 : 0,
      y: -100,
      opacity: 0,
    });
    tl.to(svg, {duration: 0.5, attr: {d: curve}, ease: 'power2.easeIn'}).to(
      svg,
      {
        duration: 0.5,
        attr: {d: flat},
        ease: 'power2.easeOut',
      }
    );
    tl.to('.loader-wrap', {y: -500});
    tl.to('.loader-wrap', {zIndex: -1, display: 'none'});
  }, []);

  return (
    <div className="loader-wrap">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
      </svg>

      <div className="loader-wrap-heading">
        <span>
          <h2 className="load-text">
            {projectName ? (
              projectName
                .split('')
                .map((letter, index) => <span key={index}>{letter}</span>)
            ) : (
              <>
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <Dot>.</Dot>
                <Dot>.</Dot>
                <Dot>.</Dot>
              </>
            )}
          </h2>
        </span>
      </div>
    </div>
  );
};

export default Loader;
