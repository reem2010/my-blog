import postModel from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    let posts = await postModel.getPosts();
    posts = posts.map((post) => {
      const { _id, ...rest } = post;
      return { id: _id, ...rest, author: rest.author.username };
    });
    res.json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json("error: Internal server error");
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const post = await postModel.create({
      title,
      content,
      image,
      author: req.userId,
    });
    res.json({ post, message: "Post created successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json("error: Internal server error");
  }
};

export const deletePost = async (req, res) => {
  try {
    const deleted = await postModel.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "Post does not exist" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json("error: Internal server error");
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const updated = await postModel.findByIdAndUpdate(req.params.id, {
      title,
      content,
      image,
    });
    if (updated) {
      res.json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ error: "Post does not exist" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json("error: Internal server error");
  }
};
