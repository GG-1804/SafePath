'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield } from 'lucide-react';
import styles from './landingPage.module.css';

type PageLabel =
  | 'Home'
  | 'Path'
  | 'Report'
  | 'Emergency Helpline'
  | 'Nearby Help'
  | 'Trusted Contacts';

const LandingPage = () => {
  const router = useRouter();

  const handleNavigation = (page: PageLabel) => {
    switch (page) {
      case 'Home':
        router.push('/landing');
        break;
      case 'Path':
        router.push('/SafePath');
        break;
      case 'Report':
        router.push('/report');
        break;
      case 'Emergency Helpline':
        alert('Coming Soon: Quick access to verified helpline numbers');
        break;
      case 'Nearby Help':
        alert('Coming Soon: Nearby safe zones and volunteers');
        break;
      case 'Trusted Contacts':
        alert('Coming Soon: Add and alert trusted people in emergencies');
        break;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Sticky Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Shield className={styles.logoIcon} />
          <span className={styles.logoText}>SafePath</span>
        </div>

        <div className={styles.navButtons}>
          {[
            'Home',
            'Path',
            'Report',
            'Emergency Helpline',
            'Nearby Help',
            'Trusted Contacts',
          ].map((label) => (
            <button
              key={label}
              onClick={() => handleNavigation(label as PageLabel)}
              className={styles.navButton}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Your Safety, <span className={styles.highlight}>Our Mission</span>
          </h1>
          <p className={styles.heroDescription}>
             Empowering women to navigate the world with confidence through intelligent safety technology. Our app provides safe route prediction, emergency fake call functionality, incident reporting, and trusted contact alerts to keep you secure wherever you go. need this
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;