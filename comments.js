// Create web server
// 1. Import express
const express = require('express');
const app = express();
// 2. Import comments.js
const comments = require('./comments.js');
// 3. Import body-parser
const bodyParser = require('body-parser');
// 4. Import cors
const cors = require('cors');
// 5. Use cors
app.use(cors());
// 6. Use body-parser
app.use(bodyParser.json());
// 7. Create a GET endpoint for /comments
app.get('/comments', (req, res) => {
  comments.getComments((err, comments) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(comments);
    }
  });
});
// 8. Create a POST endpoint for /comments
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.addComment(comment, (err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(comment);
    }
  });
});
// 9. Start server
app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});
// 10. Add error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
// 11. Add comments.js