const mongoose = require('mongoose');
const marked = require('marked'); // allows us to create a markdown and converts it into html
const slugify = require('slugify'); // allow use to convert article title into a url friendly slug
const createDomPurify = require('dompurify'); // sanitizes the html from malicious code
const { JSDOM } = require('jsdom'); // allows us to renders html inside of Node.js
const dompurify = createDomPurify(new JSDOM().window); // allows the dom purifier to create html and purify it by using this jsdom window object

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

// this runs before validating article data
BlogSchema.pre('validate', function (next) {
  // creates a unique slug for each article using the article title
  // and converting it into a url friendly string
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // converts markdown to html and then purifies the html to
  // remove any malicious code and to escape all html characters
  if (this.article) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.article));
  }

  next();
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
