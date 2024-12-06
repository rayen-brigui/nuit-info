import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.overlay}></div>
      <div className={styles.text}>
        <h1>Save Our Oceans</h1>
        <p>Explore the vital connections between the human body and the ocean. Join us in raising awareness and taking action to protect our environment.</p>
      </div>
    </header>
  );
};

export default Header;
