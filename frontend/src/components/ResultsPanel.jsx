import React, { useEffect, useRef, useState } from 'react';
import styles from './ResultsPanel.module.css';
import { getBreedFact, getConfidenceLevel } from '../utils/constants';

export default function ResultsPanel({ predictions, previewSrc, visible }) {
  const sectionRef = useRef(null);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    if (visible && predictions) {
      const timer = setTimeout(() => {
        setAnimIn(true);
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setAnimIn(false);
    }
  }, [visible, predictions]);

  if (!visible || !predictions) return null;

  const top = predictions[0];
  const runners = predictions.slice(1, 4);
  const conf = getConfidenceLevel(top.pct);
  const fact = getBreedFact(top.breed);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${animIn ? styles.sectionVisible : ''}`}
    >
      <div className={styles.divider}>
        <div className={styles.line} />
        <div className={styles.dividerLabel}>✦ Results</div>
        <div className={styles.line} />
      </div>

      <div className={styles.grid}>
        {/* Image showcase */}
        <div className={styles.imgShowcase}>
          <img
            src={previewSrc}
            alt={top.breed}
            className={`${styles.img} ${animIn ? styles.imgVisible : ''}`}
          />
          <div className={`${styles.imgOverlay} ${animIn ? styles.imgOverlayVisible : ''}`}>
            <div className={styles.overlayBreed}>{top.breed}</div>
            <div className={styles.overlayPct}>{top.pct}%</div>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          {/* Top card */}
          <div className={`${styles.topCard} ${animIn ? styles.topCardIn : ''}`}>
            <div className={styles.topLabel}>
              <span className={styles.rankBadge}>1</span>
              Top Match
            </div>
            <div className={styles.topBreed}>{top.breed}</div>
            <div className={styles.topPctRow}>
              <div className={styles.topPct}>{top.pct}%</div>
              <div className={`${styles.confBadge} ${styles[`conf_${conf.cls}`]}`}>
                {conf.label}
              </div>
            </div>

            {/* Confidence warning message */}
            {top.pct < 60 && (
              <p className={styles.confMsg}>
                {top.pct < 40
                  ? "⚠ Not sure about this prediction. Try another image."
                  : "⚠ This might be correct, but not fully confident."}
              </p>
            )}

            {/* Progress bar */}
            <div className={styles.barWrap}>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: animIn ? `${top.pct}%` : '0%' }}
                />
              </div>
            </div>

            {/* Fun fact */}
            <div className={styles.factCard}>
              <span className={styles.factIco}>💡</span>
              <p
                className={styles.factText}
                dangerouslySetInnerHTML={{ __html: fact }}
              />
            </div>
          </div>

          {/* Runners-up */}
          {runners.length > 0 && (
            <div className={styles.runnersWrap}>
              <div className={styles.runnersLabel}>Other possibilities</div>
              {runners.map((p, i) => (
                <RunnerRow
                  key={p.breed}
                  rank={i + 2}
                  breed={p.breed}
                  pct={p.pct}
                  delay={(i + 1) * 150 + 300}
                  animIn={animIn}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RunnerRow({ rank, breed, pct, delay, animIn }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (animIn) {
      const t = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(t);
    } else {
      setShow(false);
    }
  }, [animIn, delay]);

  return (
    <div className={`${styles.runnerRow} ${show ? styles.runnerIn : ''}`}>
      <div className={styles.runnerRank}>{rank}</div>
      <div className={styles.runnerBreed}>{breed}</div>
      <div className={styles.runnerBarWrap}>
        <div className={styles.runnerTrack}>
          <div
            className={styles.runnerFill}
            style={{ width: show ? `${pct}%` : '0%' }}
          />
        </div>
      </div>
      <div className={styles.runnerPct}>{pct}%</div>
    </div>
  );
}
