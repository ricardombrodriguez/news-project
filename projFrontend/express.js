const redis = require('redis');
const express = require('express');
const app = express();
const port = 8000;

var client = redis.createClient({
  url: 'redis://admin:password123@redis-cluster:6379'
});

// Add middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (req,res) => {
  res.send('hello world');
})

app.get('/cache', (req, res) => {
  client.get(req, (err, data) => {
    let apiResponseString = {};
    if (data) {
      const responseBody = Buffer.concat(data).toString();
      apiResponseString = JSON.stringify(responseBody);
    }
    res.send(apiResponseString);
  });
});

app.set('/cache', (req, res) => {
  client.set(req.key, req.value);
  res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});