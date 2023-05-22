const Redis = require('ioredis');
const crypto = require('crypto');
const http = require('http');

let redisClient;
let baseUrl = `http://127.0.0.1:7007/ws/`;

async function connectToRedis() {
  redisClient = new Redis({
    host: 'localhost', // Redis server host
    port: 6379, // Redis server port
  });

  // Check if the client is already connected or connecting
  if (
    redisClient.status === 'connecting' ||
    redisClient.status === 'connected'
  ) {
    console.log('Already connecting or connected to Redis server');
    return redisClient;
  }

  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis server');
  } catch (error) {
    console.error('Failed to connect to Redis server:', error);
  }

  return redisClient;
}

function hashKey(key) {
  const hash = crypto.createHash('sha256');
  hash.update(key);
  const hashedKey = hash.digest('hex');
  return hashedKey;
}

function saveOnRedis(key, value) {
  redisClient.set(key, value);
  redisClient.pexpire(key, 60000); // Time to live: one minute
}

function searchRequest(request) {
  return new Promise((resolve, reject) => {
    const key = hashKey(request);
    console.log(key);
    redisClient.get(key, (err, data) => {
      if (err) {
        reject(err);
      } else if (data === null) {
        const options = {
          method: 'GET',
          hostname: '127.0.0.1',
          port: 7007,
          path: '/ws/publications',
        };

        const req = http.request(options, (res) => {
          const chunks = [];

          res.on('data', (chunk) => {
            chunks.push(chunk);
          });

          res.on('end', () => {
            const responseBody = Buffer.concat(chunks).toString();
            const apiResponseString = JSON.stringify(responseBody);
            saveOnRedis(key, apiResponseString);
            resolve(apiResponseString);
          });
        });

        req.on('error', (error) => {
          reject(error);
        });

        req.end();
      } else {
        resolve(data);
      }
    });
  });
}

(async () => {
  const redisClient = await connectToRedis();

  const res = await searchRequest('publications');
  const parsedRes = JSON.parse(res);
  console.log('Result:', parsedRes);
  // Cleanup and close the connection
  await redisClient.quit();
})();
