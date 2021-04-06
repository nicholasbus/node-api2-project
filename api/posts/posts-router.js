// implement your posts router here
const express = require("express");
const router = express.Router();
const Posts = require("./posts-model");

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => res.status(200).json(posts))
    .catch((err) =>
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" })
    );
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "The post information could not be retrieved" })
    );
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.insert(req.body)
      .then((newPost) => res.status(201).json(newPost))
      .err((err) =>
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        })
      );
  }
});

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Posts.update(req.params.id)
      .then((updatedPost) => {
        if (!updatedPost) {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
        } else {
          res.status(200).json(updatedPost);
        }
      })
      .catch((err) =>
        res
          .status(500)
          .json({ message: "The post information could not be modified" })
      );
  }
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((removedPost) => {
      if (!removedPost) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(removedPost);
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "The post could not be removed" })
    );
});

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((comments) => {
      if (!comments) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(comments);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    });
});

module.exports = router;
