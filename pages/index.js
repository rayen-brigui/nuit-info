import Head from 'next/head';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import HeartCirculatory from '../components/HeartCirculatory';
import OceanWaves from '../components/OceanWaves';
import LungsGasExchange from '../components/LungsGasExchange';
import styles from '../styles/Home.module.css';
import Header from '@/components/Header';
import Footer from '@/components/footer';

const Home = () => {
  const [activeText, setActiveText] = useState('');

  const handleItemClick = (text) => {
    setActiveText(text);
  };

  return (
    <>
      <Head>
        <title>Human Body and Ocean Comparisons</title>
        <meta name="description" content="A web application comparing the human body and the ocean to raise awareness about conservation." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <Header />
      <main className={styles.main}>
        <h1>Welcome to the Human Body and Ocean Comparisons</h1>
        <p>Explore the fascinating similarities between the human body and the ocean.</p>
        <ul className={styles.similarityList}>
          <li onClick={() => handleItemClick('Heart: Circulatory System')}>Heart and Circulatory System</li>
          <li onClick={() => handleItemClick('Lungs: Gas Exchange')}>Lungs and Gas Exchange</li>
          <li onClick={() => handleItemClick('Ocean Waves')}>Ocean Waves</li>
        </ul>
        <div className={styles.scenesContainer}>
          <HeartCirculatory activeText={activeText} />
          <LungsGasExchange activeText={activeText} />
          <OceanWaves activeText={activeText} />
        </div>
      </main>
      
    </>
  );
};

export default Home;
