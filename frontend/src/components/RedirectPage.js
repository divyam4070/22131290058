import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Log } from '../services/logger';

function RedirectPage() {
  const { shortcode } = useParams();

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem("urls")) || [];
    const urlObj = storedUrls.find(u => u.shortcode === shortcode);

    if (!urlObj) {
      alert("Short URL not found.");
      Log("frontend", "error", "handler", `Redirect failed, no short URL: ${shortcode}`);
      return;
    }

    const now = new Date();
    if (now > new Date(urlObj.expiry)) {
      alert("This short link has expired.");
      Log("frontend", "warning", "handler", `Attempted expired link: ${shortcode}`);
      return;
    }

    // Record click
    const clickRecord = {
      timestamp: new Date().toISOString(),
      source: document.referrer || "Direct",
      location: "N/A" // Optional: use ipinfo or similar API if needed
    };

    urlObj.clicks.push(clickRecord);
    localStorage.setItem("urls", JSON.stringify(storedUrls));

    Log("frontend", "info", "service", `Redirected to ${urlObj.longUrl} via ${shortcode}`);

    // Redirect
    window.location.href = urlObj.longUrl;

  }, [shortcode]);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
}

export default RedirectPage;
