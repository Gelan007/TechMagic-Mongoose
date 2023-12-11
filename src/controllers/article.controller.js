import Article from '../models/article.model.js';
import User from "../models/user.model.js";

export const getArticles = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.title) {
      query.title = {$regex: req.query.title, $options: 'i'};
    }
    const articles = await Article.find(
        query,
        {},
        {
          limit: parseInt(req.query.limit) || 10,
          page: parseInt(req.query.page) || 1,
          populate: {path: 'owner', select: 'fullName email age'}
        }
    );
    res.json(articles);

  } catch (err) {
    next(err);
  }
}

export const getArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId).populate({
      path: 'owner',
      select: 'fullName email age'
    });

    if (!article) {
      return res.status(404).json({ message: `Article with id ${articleId} not found` });
    }
    res.json(article);

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
    owner.articles.push(article._id);
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
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId);
    const user = await User.findById(article.owner);

    if (!article) {
      return res.status(404).json({ message: `Article with id ${articleId} not found` });
    }
    if (!user) {
      return res.status(404).json({ message: `Owner not found` });
    }

    await article.deleteOne({_id: articleId});
    user.numberOfArticles -= 1;
    await user.save();

    res.json({ message: `Article deleted successfully` });
  } catch (err) {
    next(err);
  }
}
