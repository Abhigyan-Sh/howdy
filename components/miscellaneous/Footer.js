import React from 'react';
import homeStyles from '../styles/Home.module.css';

const Footer = () => {
  return (
    <footer className={homeStyles.footer}>
      <a
        href="https://github.com/Abhigyan-Sh"
        target="_blank"
        rel="noopener noreferrer"
      >
        the Creator {' '}
        <span className={homeStyles.logo}>
          <Image src="/logo.png" alt="Creators Pixelated-art Pic" width={72} height={16} />
        </span>
      </a>
    </footer>
  )
}

export default Footer;