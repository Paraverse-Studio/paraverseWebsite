// ################### THIS FILE CONTAINS ALL THE USER ACCOUNT ROUTES ###################//
const router = require('express').Router();
const Blog = require('../models/blogSchema');
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
  const { title, description, article } = req.body;

  const blog = new Blog({
    title,
    description,
    article,
  });

  try {
    console.log('saving....' + blog);
    const savedBlog = await blog.save((err, result) => {
      if (err) console.log(err);
      else console.log(savedBlog);
    });
    res.redirect(`/blogs/${blog.slug}`);
  } catch (e) {
    res.render('../views/blogs/new_blog', {
      blog,
      title: 'New Blog',
      user: req.user,
    });
  }
});

// apply changes to a blog [ADMIN ONLY]
router.put('/blogs/:id', checkAuthenticated, async (req, res, next) => {
  const { title, description, article } = req.body;

  req.blog = await Blog.findById(req.params.id);

  let blog = req.blog;

  blog.title = title;
  blog.description = description;
  blog.article = article;

  try {
    const savedBlog = await blog.save((err, result) => {
      if (err) console.log(err);
      else console.log(savedBlog);
    });
    res.redirect(`/blogs/${blog.slug}`);
  } catch (e) {
    res.render('../views/blogs/edit_blog', {
      blog,
      title: 'Edit Blog',
      user: req.user,
    });
  }
});

// delete a blog [ADMIN ONLY]
router.delete('/blogs/:id', checkAuthenticated, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/blogs');
});

module.exports = router;
