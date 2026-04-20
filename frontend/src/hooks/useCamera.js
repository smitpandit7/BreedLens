import { useState, useRef, useCallback, useEffect } from 'react';

export function useCamera() {
  const [isOpen, setIsOpen] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [hasCamera, setHasCamera] = useState(false);
  const streamRef = useRef(null);
  const videoRef = useRef(null);

  // Check camera availability on mount
  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      setHasCamera(true);
    }
  }, []);

  const startStream = useCallback(async (facing) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      throw new Error('Camera access denied. Please allow camera permission and try again.');
    }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const openCamera = useCallback(async () => {
    setIsOpen(true);
    await startStream(facingMode);
  }, [facingMode, startStream]);

  const closeCamera = useCallback(() => {
    stopStream();
    setIsOpen(false);
  }, [stopStream]);

  const flipCamera = useCallback(async () => {
    stopStream();
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    await startStream(next);
  }, [facingMode, startStream, stopStream]);

  /** Returns a File snapshot from the current video frame */
  const snap = useCallback(() => {
    return new Promise((resolve, reject) => {
      const video = videoRef.current;
      if (!video) return reject(new Error('No video element'));
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      canvas.getContext('2d').drawImage(video, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Snapshot failed'));
          const file = new File([blob], 'camera-snap.jpg', { type: 'image/jpeg' });
          const previewSrc = URL.createObjectURL(blob);
          resolve({ file, previewSrc });
        },
        'image/jpeg',
        0.92
      );
    });
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && isOpen) closeCamera(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeCamera]);

  return { isOpen, hasCamera, videoRef, openCamera, closeCamera, flipCamera, snap };
}
