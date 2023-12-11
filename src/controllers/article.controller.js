import Article from '../models/article.model.js';
import User from "../models/user.model.js";

export const getArticles = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const getArticleById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const createArticle = async (req, res, next) => {
  try {
    const owner = await User.findById(req.body.owner);
    if (!owner) {
      return res.status(400).json({message: `Owner(user) with id ${req.body.owner} is not found`});
    }

    const article = await Article.create(req.body);

    owner.numberOfArticles++;
    await owner.save();

    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
}

export const updateArticleById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const deleteArticleById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}
