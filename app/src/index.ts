import express from 'express';

const app = express();
const port = 8000;

app.get('/login', (req, res) => {
  res.send('ping');
});

app.listen(port, () => {
  console.log(`Port: ${port}`);
});
