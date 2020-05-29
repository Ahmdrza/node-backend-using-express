import { redisClient as redis } from '../configs';
import { UserData } from '../types';

export const addUserInDb = (user: UserData) => {
  return new Promise((resolve, reject) => {
    const userStringifyData = JSON.stringify(user);
    redis.SET(`user:${user.email}`, userStringifyData, (err, res) => {
      if (err) resolve('An error occurred while adding your data. Please try again later');
      resolve('success');
    });
  });
};

export const getUsersFromDb = () => {
  return new Promise((resolve, reject) => {
    redis.KEYS('user:*', (err, res) => {
      if (err) reject('An error occurred while getting users. Please try again later.');
      if (res.length > 0) {
        const users: UserData[] = [];
        res.forEach((key, index) => {
          redis.GET(key, (getUserErr, getUserRes) => {
            if (getUserErr) {
              // user with this key has error. Log it somewhere to investigate later.
            }
            const tempUser = JSON.parse(getUserRes);
            users.push(tempUser);
            if (index === res.length - 1) {
              resolve(users);
            }
          });
        });
      } else {
        resolve([]);
      }
    });
  });
};

export const getUserDetailsFromDb = (email: string) => {
  return new Promise((resolve, reject) => {
    redis.EXISTS(`user:${email}`, (err, res) => {
      if (err) reject('An error occurred while getting user details. Please try again later.');
      if (res) {
        redis.GET(`user:${email}`, (getUserErr, getUserRes) => {
          if (getUserErr) {
            // user with this key has error. Log it somewhere to investigate later.
            reject('An error occurred while getting user details. Please try again later.');
          }
          const user = JSON.parse(getUserRes);
          resolve(user);
        });
      } else {
        reject('No user with this email found');
      }
    });
  });
};