import axios from 'axios';

const allowedStacks = ['backend', 'frontend'];
const allowedLevels = ['info', 'warning', 'error'];
const allowedPackages = ['handler', 'middleware', 'service'];

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."; // your full token here

export async function Log(stack, level, packageName, message) {
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
          'Authorization': TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ Log sent successfully:', response.data);
  } catch (error) {
    console.error('❌ Failed to send log:', error.response ? error.response.data : error.message);
  }
}
