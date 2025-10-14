import React, {useEffect} from 'react';
//= Scripts
import loadBackgroudImages from '@/common/loadBackgroudImages';
import parallaxie from '@/common/parallaxie';
import useIsMobile from '@/hooks/useIsMobile';

function Header({ project }) {
  const { isMobile } = useIsMobile();

  useEffect(() => {
    loadBackgroudImages();
    parallaxie('.top-bg-img.parallaxie', 0.1, undefined, isMobile);
  }, [project]);

  return (
    <header className="proj-header1">
      <div className="container mb-50">
        <div className="row">
          <div className="col-lg-6">
            <div className="caption md-mb50">
              {project.link ? (
                <a href={project.link} target="_blank">
                  <h1>
                    {project.title}

                    <svg
                      style={{
                        marginLeft: '12px',
                        transform: 'scale(1.3)',
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-box-arrow-up-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                      />
                    </svg>
                  </h1>
                </a>
              ) : (
                <h3>{project.title}</h3>
              )}
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-end align-items-end">
            <div className="info row">
              <div className="col-sm-6">
                <div className="item mb-30">
                  <h6 className="fz-16">Category</h6>
                  <span className="sub-title ls1">{project.type}</span>
                </div>
              </div>
              {project.company && (
                <div className="col-sm-6">
                  <div className="item mb-30">
                    <a href={project.company.href} target="_blank">
                      <h6 className="fz-16">Company</h6>
                      <span className="sub-title ls1">
                        {project.company.name}
                      </span>
                    </a>
                  </div>
                </div>
              )}
              {project.date && (
                <div className="col-sm-6">
                  <div className="item mb-30">
                    <h6 className="fz-16">Date</h6>
                    <span className="sub-title ls1">{project.date}</span>
                  </div>
                </div>
              )}
              {project.location && (
                <div className="col-sm-6">
                  <div className="item mb-30">
                    <h6 className="fz-16">Location</h6>
                    <span className="sub-title ls1">{project.location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="top-bg-img bg-img parallaxie"
        data-background={project.image}
      />
    </header>
  );
}

export default Header;
