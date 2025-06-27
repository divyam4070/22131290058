import React, { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import ShortUrlCard from './ShortUrlCard';
import { Log } from '../services/logger';

export default function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('urls')) || [];
    setUrls(storedUrls);

    Log('frontend', 'info', 'service', 'Viewed Stats Page');
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: 20, marginBottom: 20 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener Statistics
      </Typography>

      {urls.length === 0 && <Typography>No URLs shortened yet.</Typography>}

      {urls.map((url) => (
        <ShortUrlCard key={url.shortcode} urlObj={url} />
      ))}
    </Container>
  );
}
