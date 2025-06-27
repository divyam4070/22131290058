import React, { useState } from 'react';
import { Paper, Typography, Button, Collapse, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function ShortUrlCard({ urlObj }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Paper elevation={2} style={{ padding: 16, marginBottom: 12 }}>
      <Typography variant="h6">
        <a
          href={`http://localhost:3000/${urlObj.shortcode}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          http://localhost:3000/{urlObj.shortcode}
        </a>
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Created At: {new Date(urlObj.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Expires At: {new Date(urlObj.expiry).toLocaleString()}
      </Typography>
      <Typography variant="body2" style={{ marginTop: 8 }}>
        Total Clicks: {urlObj.clicks.length}
      </Typography>

      <Button
        variant="outlined"
        size="small"
        onClick={() => setExpanded(!expanded)}
        style={{ marginTop: 8 }}
      >
        {expanded ? 'Hide Click Details' : 'Show Click Details'}
      </Button>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List dense>
          {urlObj.clicks.length === 0 && (
            <ListItem>
              <ListItemText primary="No clicks yet." />
            </ListItem>
          )}

          {urlObj.clicks.map((click, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`Timestamp: ${new Date(click.timestamp).toLocaleString()}`}
                  secondary={`Source: ${click.source} | Location: ${click.location}`}
                />
              </ListItem>
              {index !== urlObj.clicks.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
}
