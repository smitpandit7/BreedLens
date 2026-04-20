import React, { useCallback } from 'react';
import BgOrbs from './components/BgOrbs';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import ResultsPanel from './components/ResultsPanel';
import LoadingOverlay from './components/LoadingOverlay';
import CameraModal from './components/CameraModal';
import BottomBar from './components/BottomBar';
import { usePredictor } from './hooks/usePredictor';
import { useCamera } from './hooks/useCamera';

export default function App() {
  const { state, stats, predict, setPreviewSrc, clearError } = usePredictor();
  const camera = useCamera();

  // ── File upload handler ──────────────────────────────────
  const handleFile = useCallback(
    (file) => {
      const previewSrc = URL.createObjectURL(file);
      setPreviewSrc(previewSrc);
      predict({ file, previewSrc });
    },
    [predict, setPreviewSrc]
  );

  // ── URL handler ─────────────────────────────────────────
  const handleURL = useCallback(
    (url) => {
      setPreviewSrc(url);
      predict({ url, previewSrc: url });
    },
    [predict, setPreviewSrc]
  );

  // ── Camera snap handler ─────────────────────────────────
  const handleCameraSnap = useCallback(async () => {
    try {
      const { file, previewSrc } = await camera.snap();
      camera.closeCamera();
      setPreviewSrc(previewSrc);
      predict({ file, previewSrc });
    } catch (err) {
      camera.closeCamera();
      // surface error via predictor
      predict({ file: null, url: '' }).catch(() => {});
    }
  }, [camera, predict, setPreviewSrc]);

  const loading = state.status === 'loading';

  return (
    <>
      <BgOrbs />
      <LoadingOverlay visible={loading} />

      {camera.isOpen && (
        <CameraModal
          isOpen={camera.isOpen}
          videoRef={camera.videoRef}
          onClose={camera.closeCamera}
          onSnap={handleCameraSnap}
          onFlip={camera.flipCamera}
        />
      )}

      <Header />

      <main>
        <Hero>
          <UploadZone
            onFile={handleFile}
            onURL={handleURL}
            onOpenCamera={camera.hasCamera ? camera.openCamera : null}
            loading={loading}
            error={state.error}
            onClearError={clearError}
          />
        </Hero>

        <ResultsPanel
          predictions={state.predictions}
          previewSrc={state.previewSrc}
          visible={state.status === 'success'}
        />
      </main>

      <BottomBar stats={stats} />
    </>
  );
}
