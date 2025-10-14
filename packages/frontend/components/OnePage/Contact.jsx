import appData from '@/data/app-data';

function Contact() {
  const _handleOnSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    window.open(`mailto:${ event.target[0].value }?subject=${ event.target[2].value } - ${ event.target[0].value }&body=${ event.target[3].value }`, '_blank')
  }

  return (
    <section id={'contact'} className='contact-crev no-crev section-padding'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-5'>
            <div className='sec-head md-mb80'>
              <h6 className='sub-title wow fadeInUp'>Get In Touch</h6>
              <h2 className='fz-50 d-rotate wow'>
                <span className='rotate-text'>Let's make your brand brilliant!</span>
              </h2>
              <p className='fz-15 mt-10'>If you would like to work with us or just want to get in touch, we’d love to
                hear from you!</p>
              <div className='phone fz-30 fw-600 mt-30 underline main-color'>
                <a href='#0'>{appData.company.phone}</a>
              </div>
              {appData.company.facebook || appData.company.linkedin && (
                <ul className='rest social-text d-flex mt-60'>
                  {appData.company.facebook && (
                    <li className='mr-30'>
                      <a href={appData.company.facebook} className='hover-this'><span
                        className='hover-anim'>Facebook</span></a>
                    </li>
                  )}

                  {appData.company.linkedin && (
                    <li>
                      <a href={appData.company.linkedin} className='hover-this'><span
                        className='hover-anim'>LinkedIn</span></a>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className='col-lg-6 offset-lg-1 valign'>
            <div className='full-width'>
              <form
              id='contact-form'
              method='post'
              onSubmit={_handleOnSubmit}
              style={{
                'input, textarea': {
                  color: 'red'
                }
              }}>
                <div className='messages'></div>
                <div className='controls row'>
                  <div className='col-lg-6'>
                    <div className='form-group mb-30'>
                      <input id='form_name' type='text' name='name' placeholder='Name' required='required'/>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='form-group mb-30'>
                      <input id='form_email' type='email' name='email' placeholder='Email' required='required'/>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='form-group mb-30'>
                      <input id='form_subject' type='text' name='subject' placeholder='Subject'/>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className='form-group'>
                      <textarea id='form_message' name='message' placeholder='Message' rows='4'
                                required='required'></textarea>
                    </div>
                    <div className='mt-30'>
                      <button type='submit' className='butn butn-full butn-bord radius-30'>
                        <span className='text'>Let's Talk</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
