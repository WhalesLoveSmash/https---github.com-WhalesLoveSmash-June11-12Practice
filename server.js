// backend.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory store for orders
const orders = [];

app.get('/', (req, res) => {
  res.send('👻 Welcome to Ghost Kitchen backend');
});

// GET endpoint to return all orders as JSON
app.get('/orders', (req, res) => {
  res.json(orders);
});

// POST endpoint to receive new orders
app.post('/order', (req, res) => {
  const { name, item, quantity, timestamp } = req.body;

  // Simple validation
  if (!name || !item || !quantity) {
    return res.status(400).json({ error: 'Missing order data' });
  }

  // Push new order to in-memory array with timestamp fallback
  orders.push({
    name,
    item,
    quantity,
    timestamp: timestamp || new Date().toISOString(),
  });

  console.log(`New order from ${name}: ${quantity}x ${item}`);

  res.status(200).json({ message: 'Order received' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});