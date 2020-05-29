import { UserData } from '../types';
import { addUserInDb, getUsersFromDb, getUserDetailsFromDb } from '../modals';
import { emailsExists } from '../services';

/**
 * @returns users list
 */
export const getUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await getUsersFromDb();
      resolve(users);
    } catch(error) {
      reject(error);
    }
  });
};

/**
 * @param email requires user email
 * @returns returns user details
 */
export const getUserDetails = (email: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDetails = await getUserDetailsFromDb(email);
      resolve(userDetails);
    } catch(error) {
      reject(error);
    }
  });
};

/**
 * @param user requires user data
 * @returns returns user data
 */
export const addUser = (user: UserData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailAlreadyExists = await emailsExists(user.email);
      if (emailAlreadyExists) {
        reject('Email already exists in db. Please use another email address');
      } else {
        await addUserInDb(user);
        resolve(user);
      }
    } catch(error) {
      reject(error);
    }
  });
};