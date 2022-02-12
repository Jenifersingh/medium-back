const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  body: {
    type: String,
  },
  useId: {
    type: String,
  },
  time: {
    type: String,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
