const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Store orders in memory for demo (replace with DB for prod)
let orders = [];

// Get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Receive new order
app.post('/order', (req, res) => {
  const { name, item } = req.body;
  if (!name || !item) {
    return res.status(400).json({ error: 'Name and item are required.' });
  }

  const newOrder = {
    id: Date.now(),
    name,
    item,
    timestamp: new Date().toISOString()
  };
  orders.unshift(newOrder); // newest first

  // Limit orders to last 20 for UX balance
  if (orders.length > 20) orders.pop();

  res.json({ message: 'Order received', order: newOrder });
});

app.listen(PORT, () => {
  console.log(`Ghost Kitchen backend alive on http://localhost:${PORT}`);
});