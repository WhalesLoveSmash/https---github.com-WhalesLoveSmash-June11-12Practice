const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './orders.json';

app.get('/', (req, res) => {
  res.send('👻 Welcome to Ghost Kitchen backend');
});

app.get('/orders', (req, res) => {
  const orders = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8') || '[]');
  res.json(orders.reverse());
});

app.post('/order', (req, res) => {
  const orders = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8') || '[]');
  const newOrder = {
    name: req.body.name,
    item: req.body.item,
    timestamp: Date.now()
  };
  orders.push(newOrder);
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
  res.status(200).json({ message: 'Order received' });
});

app.listen(PORT, () => {
  // no console logs, we're haunted now
});