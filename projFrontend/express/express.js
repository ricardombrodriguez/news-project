const express = require('express');
const Redis = require('ioredis');
const crypto = require('crypto');
const { parse } = require("url");

const app = express();

const connectionString = 'redis://admin:password123@redis-cluster:6379';
const { hostname, port, auth } = parse(connectionString);
const host = hostname.replace("redis://", "");

const redisClient = new Redis({
  host: host,
  port: parseInt(port),
  password: auth.split(":")[1],
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

app.use(express.json());

function hashKey(key) {
  const hash = crypto.createHash('sha256');
  hash.update(key);
  const hashedKey = hash.digest('hex');
  return hashedKey;
}

app.get('/get/:key', (req, res) => {

  const key = hashKey(req.params.key);

  redisClient.get(key, (err, data) => {
    if (err) {
      console.error('Error retrieving data from Redis:', err);
      res.status(500).send('Error retrieving data');
      return;
    }

    if (data) {
      res.send(data);
    } else {
      res.status(404).send('No data for given key');
    }
  });
});

app.post('/set', (req, res) => {
  const key = hashKey(req.body.key);
  const value = req.body.value;

  console.log('key:', key);
  console.log('value:', value);

  redisClient.set(key, value, 'PX', 600000, (err) => {
    if (err) {
      console.error('Error setting data in Redis:', err);
      res.status(500).send('Error setting data');
      return;
    }

    res.status(200).json({ message: 'Key-value pair saved' });
  });
});


app.listen(8000, () => {
  console.log('Server started on port 8000');
});
