import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
  try {
    const sort = {};
    if (req.query.sortBy === 'age') {
      sort.age = req.query.order === 'asc' ? 1 : -1;
    }
    const users = await User.find({}, 'fullName email age').sort(sort)

    res.json(users);
  } catch (err) {
    next(err);
  }
}

export const getUserByIdWithArticles = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export const updateUserById = async (req, res, next) => {
  try {
    

  } catch (err) {
    next(err);
  }
}

export const deleteUserById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

