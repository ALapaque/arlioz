import React from 'react';
import Link from 'next/link';
//= Data
import data from '@/data/OnePage/team.json';
import appData from "@/data/app-data";

function Team() {
  return (
    <section className="team section-padding">
      <div className="container">
        <div className="sec-head mb-80">
          <div className="row">
            <div className="col-lg-8">
              <h6 className="sub-title opacity-8 wow fadeInUp">The experts</h6>
              <h2 className="d-rotate wow">
                <span className="rotate-text">Meet Our Team.</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row md-marg">
          {
            appData.company.team.map(member => (
              <div className="col-lg-6 col-md-6" key={member.id}>
                <div className="item mb-50">
                  <div className="img">
                    <img src={member.picture} alt="" />
                  </div>
                  <div className="info mt-20">
                    <span className="fz-12 opacity-8">{member.position}</span>
                    <h6 className="fz-18">{member.name}</h6>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Team
