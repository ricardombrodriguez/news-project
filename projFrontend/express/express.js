const express = require('express');
const Redis = require('ioredis');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connectionStringMasters = 'redis://redis-master-lb:6379';
const connectionStringSlaves = 'redis://redis-slave-svc:6379';

const redisClientMasters = new Redis(connectionStringMasters);
const redisClientSlaves = new Redis(connectionStringSlaves);

redisClientMasters.on('connect', () => {
  console.log('Connected to Redis Masters LB');
});

redisClientMasters.on('error', (err) => {
  console.error('Error connecting to Redis Masters LB: ', err);
});

redisClientSlaves.on('connect', () => {
  console.log('Connected to Redis Slaves LB');
});

redisClientSlaves.on('error', (err) => {
  console.error('Error connecting to Redis Slaves LB: ', err);
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

  redisClientSlaves.get(key, (err, data) => {
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

  redisClientMasters.set(key, value, 'PX', 600000, (err) => {
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
