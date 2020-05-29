import { redisClient as redis } from '../configs';

export const emailsExists = (email: string) => {
  return new Promise((resolve, reject) => {
    redis.EXISTS(`user:${email}`, (err, res) => {
      if (err) reject('An error occurrd. Please try again later.');
      resolve(res);
    });
  });
};