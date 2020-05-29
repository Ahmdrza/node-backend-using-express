import express from 'express';
const userRouter = express.Router();
import { getUsers, addUser, getUserDetails } from '../controllers';
import { addUserValidation } from '../validators';

/* GET users listing. */
userRouter.get('/', async (req, res, next) => {
  try {
    const userList = await getUsers();
    res.status(200).json({status: 'success', users: userList});
  } catch (error) {
    res.status(400).json({status: 'error', message: error});
  }
});

/* GET user details */
userRouter.get('/:email', async (req, res, next) => {
  try {
    const userDetails = await getUserDetails(req.params.email);
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(400).json({status: 'error', message: error});
  }
});

/* POST user details */
userRouter.post('/', addUserValidation, async (req, res, next) => {
  try {
    const userData = await addUser(req.body);
    res.status(200).json({status: 'success', user: userData});
  } catch (error) {
    res.status(400).json({status: 'error', message: error});
  }
});

/* UPDATE user details */
userRouter.put('/:email', addUserValidation, async (req, res, next) => {
  try {
    const userData = await addUser(req.body);
    res.status(200).json({status: 'success', user: userData});
  } catch (error) {
    res.status(400).json({status: 'error', message: error});
  }
});

export default userRouter;