import Head from 'next/head';
import ContactForm from '../components/ContactForm';
import styles from '../styles/ContactPage.module.css';

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact Us - Save the Ocean</title>
        <meta name="description" content="Get in touch with us for any inquiries or feedback." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div className={styles.contactPage}>
        <ContactForm />
        <div className={styles.contactInfo}>
          <h2>Contact Information</h2>
          <p>Email: info@nuitinfo.com</p>
          <p>Phone: +216 99 123 345</p>
          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Contact;
