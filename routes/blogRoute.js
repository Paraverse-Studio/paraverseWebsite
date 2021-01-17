// ################### THIS FILE CONTAINS ALL THE USER ACCOUNT ROUTES ###################//
const router = require('express').Router();
const bcrypt = require('bcrypt'); // required to 'hash' user 'passwords' for 'user security'
const passport = require('passport');
const User = require('../models/userSchema');
const Blog = require('../models/blogSchema');
const jwt = require('jsonwebtoken'); // required to 'authorize' user to 'private routes'
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth');

// displays all blogs to users
router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: 'desc' });
  res.render('../views/blogs/blogs', {
    title: 'Blogs',
    user: req.user,
    blogs,
  });
});

router.get('/blogs/new', async (req, res) => {
  res.render('../views/blogs/new_blog', {
    title: 'New Blog',
    user: req.user,
    blog: new Blog(),
  });
});

// read/view individual blog
router.get('/blogs/:slug', async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });

  if (blog == null) res.redirect('/blogs');

  res.render('../views/blogs/view_blog', {
    title: 'View Blog',
    user: req.user,
    blog,
  });
});

// edit a blog [ADMIN ONLY]
router.get('/blogs/edit/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  res.render('../views/blogs/edit_blog', {
    title: 'Edit Blog',
    user: req.user,
    blog,
  });
});

// post a blog [ADMIN ONLY]
router.post(
  '/blogs',
  async (req, res, next) => {
    req.blog = new Blog();
    next();
  },
  saveBlogAndRedirect('new_blog', 'New Blog')
);

// apply changes to a blog [ADMIN ONLY]
router.put(
  '/blogs/:id',
  async (req, res, next) => {
    req.blog = await Blog.findById(req.params.id);
    next();
  },
  saveBlogAndRedirect('edit_blog', 'Edit Blog')
);

// delete a blog [ADMIN ONLY]
router.delete('/blogs/:id', (req, res) => {
  res.redirect('/blogs');
});

function saveBlogAndRedirect(path, title) {
  return async (req, res) => {
    let blog = req.blog;
    (blog.title = req.body.title),
      (blog.description = req.body.description),
      (blog.markdown = req.body.markdown);
    try {
      await blog.save();
      console.log('saved');
      res.redirect(`/blogs/${blog.slug}`);
    } catch (e) {
      res.render(`../views/blogs/${path}`, { blog: blog, title: `${title}` });
    }
  };
}

module.exports = router;
