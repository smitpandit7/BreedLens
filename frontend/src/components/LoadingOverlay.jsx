import React from 'react';
import styles from './LoadingOverlay.module.css';

export default function LoadingOverlay({ visible }) {
  return (
    <div className={`${styles.overlay} ${visible ? styles.on : ''}`} aria-hidden={!visible}>
      <div className={styles.ring}>
        <div className={styles.spin} />
        <div className={styles.paw}>🐾</div>
      </div>
      <div className={styles.text}>
        Identifying breed
        <span className={styles.dots}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>
    </div>
  );
}
