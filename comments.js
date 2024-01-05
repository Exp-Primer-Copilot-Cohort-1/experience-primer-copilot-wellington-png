// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Use cors and body parser
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route to get comments by post id
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route to post comments to post id
app.post('/posts/:id/comments', (req, res) => {
  // Create random id
  const commentId = randomBytes(4).toString('hex');

  // Get comment and post id
  const { content } = req.body;

  // Get comments for post id
  const comments = commentsByPostId[req.params.id] || [];

  // Push comment to comments array
  comments.push({ id: commentId, content });

  // Set comments for post id
  commentsByPostId[req.params.id] = comments;

  // Send created status and comments
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});