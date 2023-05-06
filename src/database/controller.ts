// Controller

import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../../model/user';

export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).send({ error: 'Data not found' });

    res.status(200).json(users);
  } catch (error) {
    return res.status(405).send({ error });
  }
}

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: 'User not selected' });
  } catch (error) {
    res.status(404).json({ error: 'Cannot get the User!' });
  }
}

export async function postUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body;
    if (!formData) return res.status(404).json({ error: 'Form Data not provided..' });
    const response = await Users.create(formData);
    if (response) {
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
}

export async function putUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(formData);
    }
    res.status(404).json({ error: 'User not selected' });
  } catch (error) {
    res.status(404).json({ error: 'Error while updating user' });
  }
}

export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;
    if (userId) {
      await Users.findByIdAndDelete(userId);
      res.status(200).json({ message: `User com Id ${userId} excluído com sucesso` });
    }
    res.status(404).json({ error: 'User not selected' });
  } catch (error) {
    res.status(404).json({ error: 'Error while deleting user' });
  }
}
