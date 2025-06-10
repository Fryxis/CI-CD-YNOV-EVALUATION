const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: '👋 Hello from the API!' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
