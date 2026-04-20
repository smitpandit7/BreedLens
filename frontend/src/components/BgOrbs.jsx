import React from 'react';
import styles from './BgOrbs.module.css';

export default function BgOrbs() {
  return (
    <>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
    </>
  );
}
