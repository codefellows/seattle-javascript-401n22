const express = require('express');

const { Blog } = require('../models/index');
const { ensureRole, checkToken } = require('../auth/route');

const blogRoutes = express();

blogRoutes.use(checkToken);

// RESTful Route Declarations
blogRoutes.get(
  '/blog',
  ensureRole(['reader', 'writer', 'editor', 'admin']),
  getBlogs
); // Retrieve All

blogRoutes.get(
  '/blog/:id',
  ensureRole(['reader', 'writer', 'editor', 'admin']),
  getBlog
); // Retrieve One
blogRoutes.post('/blog', ensureRole(['writer', 'editor', 'admin']), createBlog); // Create
blogRoutes.put('/blog/:id', ensureRole(['editor', 'admin']), updateBlog); // Update
blogRoutes.delete('/blog/:id', ensureRole(['admin']), deleteBlog); // Delete

async function getBlogs(req, res, next) {
  const allBlogs = await Blog.findAll();
  res.json(allBlogs);
}

async function getBlog(req, res, next) {
  const id = req.params.id;
  const blog = await Blog.findOne({
    where: { id: id },
  });
  if (blog === null) {
    next();
  } else {
    const rawBlog = {
      id: blog.id,
      title: blog.title,
      body: blog.body,
    };
    res.json(rawBlog);
  }
}

async function deleteBlog(req, res, next) {
  const id = req.params.id;
  const blog = await Blog.findOne({ where: { id: id } });
  if (blog === null) {
    next();
  } else {
    await blog.destroy();
    res.json({});
  }
}

async function createBlog(req, res, next) {
  const title = req.body.title;
  const body = req.body.body;
  const blog = await Blog.create({
    title,
    body,
  });

  res.json(blog);
}

async function updateBlog(req, res, next) {
  const id = req.params.id;
  let blog = await Blog.findOne({ where: { id: id } });
  if (blog == null) {
    next();
  } else {
    const title = req.body.title ?? blog.title;
    const body = req.body.body ?? blog.body;
    let updatedBlog = {
      title,
      body,
    };

    blog = await blog.update(updatedBlog);

    res.json(blog);
  }
}

module.exports = {
  blogRoutes,
};
