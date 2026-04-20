import React from 'react';
import styles from './BottomBar.module.css';

export default function BottomBar({ stats }) {
  const { total, totalConfidence, lastMs, recentThumbs } = stats;
  const avgConf = total > 0 ? (totalConfidence / total).toFixed(1) + '%' : '—';

  if (total === 0) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.statsRow}>
        <Stat label="Predictions" value={total} />
        <Stat label="Avg Confidence" value={avgConf} />
        <Stat label="Last Speed" value={lastMs ? `${lastMs}ms` : '—'} />
      </div>

      {recentThumbs.length > 0 && (
        <div className={styles.hist}>
          <span className={styles.histLabel}>Recent:</span>
          <div className={styles.thumbs}>
            {recentThumbs.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={styles.thumb}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statVal}>{value}</div>
    </div>
  );
}
