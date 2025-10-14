import * as React from 'react'
import { useEffect } from 'react'

const useMenu = (lightMode = true, alwaysDark = false) => {
  const [ isOpen, setIsOpen ] = React.useState(false)

  const stopScrollOnBody = () => {
    const body = document.querySelector('body');

    body.style.overflow = 'hidden';
  }

  const allowScrollOnBody = () => {
    const body = document.querySelector('body');

    body.style.overflow = 'auto';
  }

  const open = (event) => {
    let menu = document.querySelector('.hamenu');
    let nav = document.querySelector('#navi');

    event.currentTarget.classList.add('open')
    menu?.classList.add('open');
    menu.style.left = 0;

    if (lightMode && !alwaysDark) {
      nav.classList.add('navlit');
      nav.querySelector('h1.logo').style.color = 'black';
    }

    setIsOpen(true)
    stopScrollOnBody();
  }

  const close = (event) => {
    let menu = document.querySelector('.hamenu');
    let nav = document.querySelector('#navi');

    event.currentTarget.classList.remove('open')
    menu?.classList.remove('open');
    menu.style.left = `-100%`;

    if (lightMode && !alwaysDark) {
      nav.classList.remove('navlit');
      nav.querySelector('h1.logo').style.color = 'white';
    }

    setIsOpen(false)
    allowScrollOnBody();
  }

  const toggle = (event) => {
    if (event.currentTarget.classList.contains('open')) {
      close(event)
    } else {
      open(event)
    }
  }

  useEffect(() => {
    return () => {
      allowScrollOnBody();
    }
  }, []);

  return {
    isOpen,
    toggle,
    open,
    close
  }
}

export default useMenu
