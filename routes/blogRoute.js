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

// get create blog page [ADMIN ONLY]
router.get('/blogs/new', checkAuthenticated, async (req, res) => {
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
router.get('/blogs/edit/:id', checkAuthenticated, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  res.render('../views/blogs/edit_blog', {
    title: 'Edit Blog',
    user: req.user,
    blog,
  });
});

// post a blog [ADMIN ONLY]
router.post('/blogs/new', checkAuthenticated, async (req, res, next) => {
  const { title, description, markdown } = req.body;

  const blog = new Blog({
    title,
    description,
    markdown,
  });

  console.log(blog);
  try {
    const savedBlog = await blog.save();
    console.log('saved');
    res.redirect(`/blogs/${blog.slug}`);
  } catch (e) {
    res.render('../views/blogs/new_blog', {
      blog: blog,
      title: 'New Blog',
      user: req.user,
    });
  }
});

// apply changes to a blog [ADMIN ONLY]
router.put('/blogs/:id', checkAuthenticated, async (req, res, next) => {
  req.blog = await Blog.findById(req.params.id);
  let blog = req.blog;

  (blog.title = req.body.title),
    (blog.description = req.body.description),
    (blog.markdown = req.body.markdown);

  console.log(blog);
  try {
    console.log('saving...');
    blog = await blog.save();
    console.log('saved');
    res.redirect(`/blogs/${blog.slug}`);
  } catch (e) {
    res.render('../views/blogs/edit_blog', {
      blog: blog,
      title: 'Edit Blog',
      user: req.user,
    });
  }
});

// delete a blog [ADMIN ONLY]
router.delete('/blogs/:id', checkAuthenticated, (req, res) => {
  res.redirect('/blogs');
});

module.exports = router;
