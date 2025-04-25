import postModel from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    let posts = await postModel.getPosts();
    posts = posts.map((post) => {
      const { _id, ...rest } = post;
      return {
        id: _id,
        ...rest,
        author: { username: rest.author.username, id: rest.author._id },
      };
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
    const post = await postModel.findById(req.params.id);
    if (post) {
      if (post.author == req.userId) {
        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });
      } else {
        res.status(403).json({ error: "Unauthorized user" });
      }
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
    const post = await postModel.findById(req.params.id);
    if (post) {
      if (post.author == req.userId) {
        const { title, content, image } = req.body;
        await postModel.findByIdAndUpdate(req.params.id, {
          title,
          content,
          image,
        });
        res.json({ message: "Post updated successfully" });
      } else {
        res.status(403).json({ error: "Unauthorized user" });
      }
    } else {
      res.status(404).json({ error: "Post does not exist" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json("error: Internal server error");
  }
};
