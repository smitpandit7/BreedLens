import React from 'react';
import styles from './Hero.module.css';

export default function Hero({ children }) {
  return (
    <section className={styles.hero}>
      <div className={styles.eyebrow}>✦ Powered by Deep Learning</div>
      <h1 className={styles.title}>
        <span className={styles.line1}>What breed is</span>
        <span className={styles.line2}>
          <span className={styles.line2Inner}>your dog?</span>
        </span>
      </h1>
      <p className={styles.sub}>
        Drop a photo or paste an image URL. Our AI model identifies any of 120 dog breeds in under a second.
      </p>
      {children}
    </section>
  );
}
