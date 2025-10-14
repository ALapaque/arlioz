import React, {useEffect} from 'react';
import Logo from '@/components/Common/Logo';
import Link from 'next/link';

const Navigation = ({
  isOpen,
  toggle,
  lightMode,
  alwaysDark,
  darkOnScroll,
}) => {
  const scrollListener = () => {
    if (window.scrollY > window.visualViewport.height - 77) {
      toggleMenuStyle(true);
    } else {
      if (alwaysDark) return;

      toggleMenuStyle(false);
    }
  };

  const toggleMenuStyle = (state) => {
    let nav = document.getElementById('navi');

    if (!nav) return;

    if (state) {
      nav.classList.add('dark');
      nav.classList.add('change');
      nav.classList.add('nav-scroll');
      nav.querySelector('h1.logo').style.color = 'black';
      nav.querySelector('div.menu-button').style.color = 'black';
      nav.querySelector('span.menu-button__icon').style.color = 'black';
      nav.querySelector('span.menu-button__text').style.color = 'black';
    } else {
      nav.classList.remove('dark');
      nav.classList.remove('change');
      nav.classList.remove('nav-scroll');
      nav.querySelector('h1.logo').style.color = alwaysDark ? 'black' : 'white';
      nav.querySelector('div.menu-button').style.color = alwaysDark
        ? 'black'
        : 'white';
      nav.querySelector('span.menu-button__icon').style.color = alwaysDark
        ? 'black'
        : 'white';
      nav.querySelector('span.menu-button__text').style.color = alwaysDark
        ? 'black'
        : 'white';
    }
  };

  useEffect(() => {
    if (darkOnScroll || alwaysDark) {
      window.addEventListener('scroll', scrollListener);
    }

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [darkOnScroll]);

  useEffect(() => {
    toggleMenuStyle(isOpen || alwaysDark);
  }, [isOpen, alwaysDark]);

  return (
    <nav id="navi" className={`topnav ${alwaysDark && 'navlit'}`}>
      <div className="container">
        <div className="logo">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div
          className={`menu-button menu-icon cursor-pointer ${isOpen && 'open'}`}
          onClick={toggle}
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <span className="menu-button__icon icon">
            <i></i>
            <i></i>
          </span>
          <span className="menu-button__text">{isOpen ? 'Close' : 'Menu'}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
