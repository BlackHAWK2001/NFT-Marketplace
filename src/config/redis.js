import { createClient } from '@redis/client';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'  
});


client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis Client Error', err);
});

(async () => {
  try {
    await client.connect();
    console.log("Redis client connected.");
  } catch (err) {
    console.error("Redis client connection error:", err);
  }
})();

export default client;