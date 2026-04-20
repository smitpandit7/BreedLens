import { useState, useCallback } from 'react';
import { predictFromFile, predictFromURL } from '../utils/api';

const initialStats = {
  total: 0,
  totalConfidence: 0,
  lastMs: null,
  recentThumbs: [],
};

export function usePredictor() {
  const [state, setState] = useState({
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    predictions: null,
    previewSrc: null,
    error: null,
    elapsedMs: null,
  });

  const [stats, setStats] = useState(initialStats);

  const updateStats = useCallback((ms, pct, thumb) => {
    setStats((prev) => {
      const newThumbs = [thumb, ...prev.recentThumbs].slice(0, 4);
      return {
        total: prev.total + 1,
        totalConfidence: prev.totalConfidence + pct,
        lastMs: ms,
        recentThumbs: newThumbs,
      };
    });
  }, []);

  const predict = useCallback(
    async ({ file, url, previewSrc }) => {
      setState((s) => ({ ...s, status: 'loading', error: null, previewSrc: previewSrc || s.previewSrc }));
      const t0 = performance.now();
      try {
        const predictions = file
          ? await predictFromFile(file)
          : await predictFromURL(url);
        const ms = Math.round(performance.now() - t0);
        setState({ status: 'success', predictions, previewSrc: previewSrc || url, error: null, elapsedMs: ms });
        updateStats(ms, predictions[0].pct, previewSrc || url);
      } catch (err) {
        setState((s) => ({ ...s, status: 'error', error: err.message }));
      }
    },
    [updateStats]
  );

  const setPreviewSrc = useCallback((src) => {
    setState((s) => ({ ...s, previewSrc: src }));
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return { state, stats, predict, setPreviewSrc, clearError };
}
