const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL);

redis.on('connect', () => {
    console.log('Connected to redis server!!');
});

redis.on('error', (err) => {
    console.error('Redis error!!');
});

module.exports = redis;