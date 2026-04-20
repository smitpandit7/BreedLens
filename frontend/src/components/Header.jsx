import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        <img src="/logo.png" alt="BreedLens logo" className={styles.logoIco} />
        <div>
          <div className={styles.logoName}>Breed<span className={styles.logoNameAccent}>Lens</span></div>
          <div className={styles.logoTag}>Neural Breed Classifier</div>
        </div>
      </a>

      <div className={styles.badges}>
        <div className={styles.badge}>
          <span className={styles.liveDot} />
          Model Active
        </div>
        <div className={styles.badge}>EfficientNet-B3</div>
        <div className={styles.badge}>120 Breeds</div>
        <div className={styles.badge}>85.49% Accuracy</div>
      </div>
    </header>
  );
}