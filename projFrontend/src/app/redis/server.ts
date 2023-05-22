const Redis = require('ioredis');
const crypto = require('crypto');


let redisClient;


async function connectToRedis() {
  redisClient = new Redis({
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
  redisClient.pexpire(key, 60000); //time to live one minute

}

function searchRequest(request) {
  return new Promise((resolve, reject) => {
    const key = hashKey(request);
    console.log(key);
    redisClient.get(key, (err, data) => {
      if (err) {
        reject(err);
      } else if (data === null) {
        // Make request to backend
        const apiResponse = { name: 'Tiffany', age: 23, city: 'California' };
        const apiResponseString = JSON.stringify(apiResponse);

        saveOnRedis(key, apiResponse);

        resolve(apiResponseString);
      } else {
        resolve(data);
      }
    });
  });
}

(async () => {
  const redisClient = await connectToRedis();

  const key = hashKey('/api/user/1');
  const jsonRequest = { name: 'John', age: 30, city: 'New York' };
  const jsonString = JSON.stringify(jsonRequest);

  const res = await searchRequest('/api/user/1');
  const parsedRes = JSON.parse(res);
  console.log('Result:', parsedRes);

  // Cleanup and close the connection
  await redisClient.quit();
})();
