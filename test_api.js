// Test script to diagnose the local /api/github route response
const http = require('http');

console.log('Sending GET request to http://localhost:3000/api/github...');

http.get('http://localhost:3000/api/github', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('SUCCESS parsing JSON!');
      console.log('Payload keys:', Object.keys(parsed));
      console.log('success status:', parsed.success);
      if (parsed.success) {
        console.log('Username:', parsed.username);
        console.log('Total contributions:', parsed.totalContributions);
        console.log('Cells count:', parsed.cells ? parsed.cells.length : 'undefined');
        if (parsed.cells && parsed.cells.length > 0) {
          console.log('First cell:', parsed.cells[0]);
          console.log('Last cell:', parsed.cells[parsed.cells.length - 1]);
        }
      } else {
        console.log('Error message:', parsed.message);
        console.log('Fallback active:', parsed.fallback);
      }
    } catch (err) {
      console.error('Error parsing response as JSON:', err.message);
      console.log('Raw output:', data.slice(0, 1000));
    }
  });
}).on('error', (err) => {
  console.error('HTTP Request failed:', err.message);
  console.log('Ensure that the Next.js dev server is running on port 3000 (npm run dev).');
});
