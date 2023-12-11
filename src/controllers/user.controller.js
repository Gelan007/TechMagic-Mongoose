import User from '../models/user.model.js';
import Article from "../models/article.model.js";

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
    const userId = req.params.userId
    const user = await User.find({_id: userId})
        .populate({
          path: 'articles',
          select: 'title subtitle createdAt'
        });

    if(!user) {
      return res.status(404).json({message: `User with id ${userId} not found`})
    }

    res.json(user);
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
    const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: {firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age}},
        {new: true, runValidators: true }
    )
    if (!user) {
      return res.status(404).end();
    }
    res.json(user)

  } catch (err) {
    next(err);
  }
}

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    if (!user) {
      return res.status(404).json({message: `User with id ${req.params.userId} not found`});
    }

    await Article.deleteMany({ owner: req.params.userId });

    res.json({message: "Success"});
  } catch (err) {
    next(err);
  }
}

