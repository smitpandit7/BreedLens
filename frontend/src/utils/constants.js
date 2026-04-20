export const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:10000';

export const SAMPLE_IMAGES = {
  gs: {
    label: '🐕 German Shepherd',
    url: 'https://imgs.search.brave.com/clLf6AWXEE2b-01TouUmWmcUjZj19dSkKA0ifKZ9Lmo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjI0/NDQ5MDE2My9waG90/by9iZWF1dGlmdWwt/Z2VybWFuLXNoZXBo/ZXJkLWRvZy1pbi1h/dXR1bW4tc3VubGln/aHQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPU1HSnhucl9x/T0tMOUFfbzFGVlRs/QW1XS2duZkVZRVFa/aDdOYVFrOTJyc1k9',
  },
  gr: {
    label: '🦮 Golden Retriever',
    url: 'https://imgs.search.brave.com/t9m1o0_-wOri_m5fqINPasnwsQzJt8yK4iJOUE4-7Gc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/cHJkLmNvbnRlbnQu/bWV0YW1vcnBob3Np/cy5jb20vd3AtY29u/dGVudC91cGxvYWRz/L3NpdGVzLzIvMjAy/MC8xMC9zaHV0dGVy/c3RvY2tfMTUzOTYx/ODgyMS0yLmpwZw',
  },
  bd: {
    label: '🐶 Beagle',
    url: 'https://imgs.search.brave.com/s1v4D8_ht-_9X2RcGndBfNE4Il4BXQrWkoRUFbnb3Hg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cGF3bGljeS5jb20v/X25leHQvaW1hZ2Uv/P3VybD1odHRwczov/L2ltYWdlcy5jdGZh/c3NldHMubmV0L3Vi/M2J3ZmQ1M213eS9o/bk1FS253b1V2aVo4/Tzd1WllMNUgvMjcy/N2ZiNzc2YThmZmNj/OWEwYmZlMWU3YWE0/OGViZGYvQmVhZ2xl/X2RvZ19wYW50aW5n/LnBuZyZ3PTM4NDAm/cT03NQ',
  },
  lb: {
    label: '🐕‍🦺 Labrador',
    url: 'https://imgs.search.brave.com/fHmpqy2FIgoVlzn0Sf2bwDsaOefQ8aOLrcH17f7vbtg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2ODMxMzQw/MzYxNDQtODJiMGEz/ZDUwZjExP2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZhdXRvPWZvcm1h/dCZmaXQ9Y3JvcCZp/eGxpYj1yYi00LjEu/MCZpeGlkPU0zd3hN/akEzZkRCOE1IeHpa/V0Z5WTJoOE1YeDhi/R0ZpY21Ga2IzSjha/VzU4TUh4OE1IeDhm/REE9',
  },
};

export const BREED_FACTS = {
  'german shepherd': 'German Shepherds are the <strong>3rd most intelligent</strong> dog breed and can learn a new command in fewer than 5 repetitions.',
  'golden retriever': 'Golden Retrievers were originally bred in <strong>Scotland in the 1860s</strong> to retrieve waterfowl — they have an incredibly gentle "soft mouth".',
  'siberian husky': 'Huskies can run <strong>100+ miles per day</strong> in cold conditions and their double coat insulates them down to −60°C.',
  'beagle': 'Beagles have one of the <strong>best noses</strong> in the dog world — around 220 million scent receptors vs humans\' 5 million.',
  'labrador retriever': 'Labradors have been the <strong>#1 most popular breed</strong> in the US for over 30 consecutive years.',
  default: 'This breed was identified using <strong>EfficientNet-B3</strong> trained on 20,000+ images across 120 Stanford dog breeds.',
};

export function getBreedFact(breedName) {
  const lower = breedName.toLowerCase();
  const key = Object.keys(BREED_FACTS).find((k) => lower.includes(k));
  return BREED_FACTS[key || 'default'];
}

export function getConfidenceLevel(pct) {
  if (pct >= 80) return { label: 'High Confidence', cls: 'hi' };
  if (pct >= 55) return { label: 'Medium', cls: 'md' };
  return { label: 'Low', cls: 'lo' };
}
