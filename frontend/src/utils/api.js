import { API_BASE } from './constants';

export async function predictFromFile(file) {
  const fd = new FormData();
  fd.append('file', file);

  const res = await fetch(`${API_BASE}/predict/upload`, {
    method: 'POST',
    body: fd,
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.predictions;
}

export async function predictFromURL(url) {
  const res = await fetch(`${API_BASE}/predict/url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, top_k: 5 }),
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.predictions;
}
