const axios = require('axios');

const allowedStacks = ['backend', 'frontend'];
const allowedLevels = ['info', 'warning', 'error'];
const allowedPackages = ['handler', 'middleware', 'service'];

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkaXZ5YW0uMjJzY3NlMTU3MDAxMkBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAxNjU2MiwiaWF0IjoxNzUxMDE1NjYyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiODdjNDlmOTUtOTRhNS00NTEzLWE1N2QtODA5NGUyNjYwN2YxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGl2eWFtIiwic3ViIjoiMjQzMDhmMTQtZmEzOC00MGRjLTg1N2UtYTcyMmUwNDg5YWNhIn0sImVtYWlsIjoiZGl2eWFtLjIyc2NzZTE1NzAwMTJAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoiZGl2eWFtIiwicm9sbE5vIjoiMjIxMzEyOTAwNTgiLCJhY2Nlc3NDb2RlIjoiTXVhZ3ZxIiwiY2xpZW50SUQiOiIyNDMwOGYxNC1mYTM4LTQwZGMtODU3ZS1hNzIyZTA0ODlhY2EiLCJjbGllbnRTZWNyZXQiOiJ0dWRyVGp1bVJ4bXpSSk5BIn0.y07JODPoNk2EJw_KQ6tTRv9WFxHU885JOsbZj8o06M8";

async function Log(stack, level, packageName, message) {
  // Validate inputs
  if (!allowedStacks.includes(stack)) {
    console.error(`❌ Invalid stack: ${stack}`);
    return;
  }
  if (!allowedLevels.includes(level)) {
    console.error(`❌ Invalid level: ${level}`);
    return;
  }
  if (!allowedPackages.includes(packageName)) {
    console.error(`❌ Invalid package: ${packageName}`);
    return;
  }

  const logData = {
    stack,
    level,
    package: packageName,
    message
  };

  try {
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/logs',
      logData,
      {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ Log sent successfully:', response.data);
  } catch (error) {
    console.error('❌ Failed to send log:', error.response ? error.response.data : error.message);
  }
}

module.exports = Log;
