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
      return res.status(400).json({message: `Owner(user) with id ${req.body.owner} not found`});
    }

    const article = await Article.create(req.body);

    owner.numberOfArticles++;
    await owner.save();

    res.json(article);
  } catch (err) {
    next(err);
  }
}

export const updateArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const { owner, title, subtitle, description, category } = req.body;
    const article = await Article.findById(articleId);
    const user = await User.findById(owner);
    console.log('a: ', articleId)
    console.log('u: ', user._id)
    if (!article) {
      return res.status(404).json({ message: `Article with id ${articleId} not found` });
    }
    if (!user) {
      return res.status(404).json({ message: `Owner with id ${owner} not found` });
    }
    if (user._id.toString() !== article.owner.toString()) {
      return res.status(400).json({ message: 'Only the owner can update the article' });
    }

    article.title = title;
    article.subtitle = subtitle;
    article.description = description;
    article.category = category;
    article.updatedAt = new Date();

    await article.save();
    res.json(article);
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
