/** @format */

const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Comment
//=================================

router.post("", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, doc) => {
    if (err) return res.status(400).send({ success: false, err });

    Comment.find({ _id: doc._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.status(400).send({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

router.get("/post/:postId", (req, res) => {
  const postId = req.params.postId;
  Comment.find({ postId: postId })
    .populate("writer")
    .exec((err, result) => {
      if (err) return res.status(400).send({ success: false, err });
      return res.status(200).json({ success: true, result });
    });
});

module.exports = router;
