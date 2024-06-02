const Blog = require("../models/Blog");

const createBlogs = async (req, res) => {
  try {
    const categoryIds = req?.body?.categories.map((x) => x.id);
    const blog = new Blog({
      author: req?.body?.author,
      categoryIds: categoryIds,
      title: req?.body?.title,
      description: req?.body?.description,
      content: req?.body?.content,
    });
    const newBlog = await blog.save();
    const blogRes = await Blog.findById(newBlog._id).populate({
      path: "categoryIds",
    });
    res.status(201).json({ message: "New blog created!", data: blogRes });
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("categoryIds");
    res.status(200).json({
      message: "Get all blogs!",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("categoryIds");
    if (blog) {
      res.status(200).json({ message: "Return blog by ID!", data: blog });
    } else {
      res.status(404).json({ message: "Blog not found!", data: {} });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const getBlogsByCategoryID = async (req, res) => {
  try {
    let filter = {};
    if (req.params.id != "null" && req.params.id != "undefined") {
      filter = { categoryIds: req.params.id };
    }
    const blogs = await Blog.find(filter).populate("categoryIds");
    res.status(200).json({
      message: "Get blogs by categoryID!",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const updateBlogByID = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("categoryIds");
    if (blog) {
      const categoryIds = req.body.categories.map((x) => x.id);
      blog.author = req.body.author || blog.author;
      blog.categoryIds = categoryIds ? categoryIds : blog.categoryIds;
      blog.title = req.body.title || blog.title;
      blog.description = req.body.description || blog.description;
      blog.content = req.body.content ? req.body.content : blog.content;
      const updatedBlog = await blog.save();
      const blogRes = await updatedBlog.populate("categoryIds");
      res.status(200).json({ message: "Blog updated!", data: blogRes });
    } else {
      res.status(404).json({ message: "Blog not found!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const deleteBlogByID = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) {
      return res.status(200).json({ message: "Blog deleted!", id: req.params.id });
    } else {
      return res.status(404).json({ message: "Blog not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const blogController = {
  createBlogs,
  getBlogs,
  getBlogById,
  getBlogsByCategoryID,
  updateBlogByID,
  deleteBlogByID,
};

module.exports = blogController;
