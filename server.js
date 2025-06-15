const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('👻 Welcome to Ghost Kitchen backend');
});

app.post('/order', (req, res) => {
  console.log('New order received:', req.body);
  res.status(200).json({ message: 'Order received' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});