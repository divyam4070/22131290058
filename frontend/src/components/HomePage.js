import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Log } from '../services/logger';

function HomePage() {
  const [urls, setUrls] = useState([{ longUrl: '', shortcode: '', validity: '' }]);
  const [results, setResults] = useState([]);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index][field] = value;
    setUrls(updatedUrls);
  };

  // Add a new URL input row (max 5)
  const addUrlField = () => {
    if (urls.length >= 5) {
      alert("You can shorten only up to 5 URLs at a time.");
      return;
    }
    setUrls([...urls, { longUrl: '', shortcode: '', validity: '' }]);
  };

  // Validate and shorten URLs
  const shortenUrls = async () => {
    const newResults = [];
    for (let item of urls) {
      const { longUrl, shortcode, validity } = item;

      // Validation
      try {
        new URL(longUrl);
      } catch {
        alert(`Invalid URL: ${longUrl}`);
        Log("frontend", "error", "handler", `Invalid URL entered: ${longUrl}`);
        continue;
      }

      if (validity && isNaN(validity)) {
        alert(`Validity should be a number`);
        Log("frontend", "error", "handler", `Invalid validity value for: ${longUrl}`);
        continue;
      }

      // Check for shortcode collision
      const storedUrls = JSON.parse(localStorage.getItem("urls")) || [];
      const isTaken = storedUrls.find(u => u.shortcode === shortcode);
      if (shortcode && isTaken) {
        alert(`Custom shortcode ${shortcode} already in use.`);
        Log("frontend", "error", "handler", `Shortcode collision for: ${shortcode}`);
        continue;
      }

      // Generate unique shortcode if not provided
      const finalShortcode = shortcode || uuidv4().slice(0, 6);

      const createdAt = new Date().toISOString();
      const expiry = new Date(Date.now() + (validity ? validity * 60000 : 1800000)).toISOString();

      const newUrl = {
        longUrl,
        shortcode: finalShortcode,
        createdAt,
        expiry,
        clicks: [],
      };

      storedUrls.push(newUrl);
      localStorage.setItem("urls", JSON.stringify(storedUrls));

      Log("frontend", "info", "service", `Short URL created: ${finalShortcode}`);
      newResults.push(newUrl);
    }
    setResults(newResults);
  };

  return (
    <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>

      {urls.map((url, idx) => (
        <Grid container spacing={2} key={idx} style={{ marginBottom: 10 }}>
          <Grid item xs={12} sm={4}>
            <TextField label="Long URL" fullWidth value={url.longUrl}
              onChange={(e) => handleChange(idx, 'longUrl', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Custom Shortcode (optional)" fullWidth value={url.shortcode}
              onChange={(e) => handleChange(idx, 'shortcode', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField label="Validity (min)" fullWidth value={url.validity}
              onChange={(e) => handleChange(idx, 'validity', e.target.value)} />
          </Grid>
        </Grid>
      ))}

      <Button variant="outlined" onClick={addUrlField} style={{ margin: 10 }}>Add Another</Button>
      <Button variant="contained" onClick={shortenUrls}>Shorten URLs</Button>

      {/* Results */}
      {results.map((result, idx) => (
        <Paper key={idx} elevation={2} style={{ padding: 10, margin: 10 }}>
          <Typography variant="body1">
            Short URL: <a href={`http://localhost:3000/${result.shortcode}`} target="_blank" rel="noopener noreferrer">
              http://localhost:3000/{result.shortcode}
            </a>
          </Typography>
          <Typography variant="body2">Expires At: {result.expiry}</Typography>
        </Paper>
      ))}

    </Paper>
  );
}

export default HomePage;
