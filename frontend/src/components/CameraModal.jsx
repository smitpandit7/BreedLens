import React, { useState } from 'react';
import styles from './CameraModal.module.css';

export default function CameraModal({ isOpen, videoRef, onClose, onSnap, onFlip }) {
  const [flash, setFlash] = useState(false);

  const handleSnap = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
    onSnap();
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.on : ''}`} role="dialog" aria-modal="true" aria-label="Camera viewfinder">
      <div className={styles.label}>Point camera at your dog</div>

      <div className={styles.viewfinder}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          playsInline
          muted
        />

        {/* Corners */}
        <div className={styles.corners}>
          <div className={`${styles.corner} ${styles.tl}`} />
          <div className={`${styles.corner} ${styles.tr}`} />
          <div className={`${styles.corner} ${styles.bl}`} />
          <div className={`${styles.corner} ${styles.br}`} />
        </div>

        {/* Scan line */}
        {isOpen && <div className={styles.scan} />}

        {/* Focus ring */}
        <div className={styles.focus} />

        {/* Flash */}
        <div className={`${styles.flash} ${flash ? styles.flashPop : ''}`} />
      </div>

      <div className={styles.controls}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close camera">
          ✕
        </button>
        <button className={styles.shutter} onClick={handleSnap} aria-label="Take photo">
          <div className={styles.shutterInner} />
        </button>
        <button className={styles.flipBtn} onClick={onFlip} aria-label="Flip camera">
          ↻
        </button>
      </div>
    </div>
  );
}
