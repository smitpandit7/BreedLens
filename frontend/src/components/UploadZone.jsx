import React, { useRef, useState, useCallback } from 'react';
import styles from './UploadZone.module.css';
import { SAMPLE_IMAGES } from '../utils/constants';

export default function UploadZone({ onFile, onURL, onOpenCamera, loading, error, onClearError }) {
  const [drag, setDrag] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDrag(true);
  }, []);

  const handleDragLeave = useCallback(() => setDrag(false), []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDrag(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onClearError();
        onFile(file);
      }
    },
    [onFile, onClearError]
  );

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        onClearError();
        onFile(file);
      }
      // Reset so same file can be re-selected
      e.target.value = '';
    },
    [onFile, onClearError]
  );

  const handleGoURL = useCallback(() => {
    const trimmed = urlValue.trim();
    if (!trimmed) return;
    onClearError();
    onURL(trimmed);
  }, [urlValue, onURL, onClearError]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') handleGoURL();
    },
    [handleGoURL]
  );

  const handleSample = useCallback(
    (key) => {
      const sample = SAMPLE_IMAGES[key];
      setUrlValue(sample.url);
      onClearError();
      onURL(sample.url);
    },
    [onURL, onClearError]
  );

  return (
    <div className={styles.card}>
      {/* Dropzone */}
      <div
        className={`${styles.dropzone} ${drag ? styles.dragActive : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        aria-label="Click or drop image to upload"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />

        <div className={styles.dzInner}>
          <div className={styles.iconWrap}>🐕</div>
          <h2 className={styles.dzTitle}>Drop your dog photo here</h2>
          <p className={styles.dzSub}>PNG, JPG, WEBP · up to 10 MB · or use a URL below</p>

          <div className={styles.btnRow}>
            <button
              className={styles.btnUpload}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              disabled={loading}
            >
              <UploadIcon />
              Choose photo
            </button>

            {/* Mobile camera button */}
            {onOpenCamera && (
              <button
                className={styles.btnCamera}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCamera();
                }}
                disabled={loading}
              >
                <CameraIcon />
                Use Camera
              </button>
            )}
          </div>
        </div>
      </div>

      {/* URL input */}
      <div className={styles.urlRow}>
        <span className={styles.urlIco}>🔗</span>
        <input
          className={styles.urlField}
          type="url"
          placeholder="Paste an image URL and press Enter…"
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className={styles.btnGo}
          onClick={handleGoURL}
          disabled={loading || !urlValue.trim()}
        >
          {loading ? 'Identifying…' : 'Identify →'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className={styles.errBanner} role="alert">
          ⚠ {error}
        </div>
      )}

      {/* Samples */}
      <div className={styles.samplesRow}>
        <span className={styles.samplesLabel}>Try:</span>
        {Object.entries(SAMPLE_IMAGES).map(([key, s]) => (
          <button
            key={key}
            className={styles.samplePill}
            onClick={() => handleSample(key)}
            disabled={loading}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 1v9M3 5l4.5-4 4.5 4M1 12.5h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
