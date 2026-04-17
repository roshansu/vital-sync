import { createClient } from 'redis';
import { redisApi } from '../lib/constants.js';
const redisClient = createClient({
    username: 'default',
    password: redisApi,
    socket: {
        host: 'redis-18286.c273.us-east-1-2.ec2.cloud.redislabs.com',
        port: 18286
    }
});


export default redisClient

