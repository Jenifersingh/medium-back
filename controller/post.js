const formidable = require("formidable");
const fs = require("fs");

const { Post } = require("../model/post");

const getPosts = (req, res) => {
  Post.find()
    .exec()
    .then(
      (data) => {
        return res.json(data);
      },
      (err) => {
        return res.json({ error: "Cannot fetch data" });
      }
    );
};

const newPost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    console.log(file);
    if (err) {
      return res.json({ error: "Cannot parse form" });
    }

    const post = new Post(fields);

    if (file.image) {
      post.image.data = fs.readFileSync(file.image.filepath);
      post.image.contentType = file.image.type;
    }

    post.userId = req.user;

    post.save().then(
      (data) => {
        return res.json(data);
      },
      (err) => {
        return res.json({ error: "Cannot post data" });
      }
    );
  });

  // return res.json({ success: true });
};

const updatePost = (req, res) => {
  const { postId } = req.params;

  Post.findOneAndUpdate({ _id: postId }, req.body).exec((err, post) => {
    if (err) {
      return res.json({ error: "Cannot update data" });
    }

    return res.json({ message: "Data updated successfully" });
  });
};

module.exports = { getPosts, newPost, updatePost };
