const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Data file path
const DATA_FILE = path.join(__dirname, 'orders.json');

// Ensure orders.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

app.get('/orders', (req, res) => {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  const orders = JSON.parse(raw || '[]');
  res.json(orders.reverse());
});

app.post('/order', (req, res) => {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  const orders = JSON.parse(raw || '[]');
  const newOrder = {
    name: req.body.name,
    item: req.body.item,
    timestamp: Date.now(),
  };
  orders.push(newOrder);
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
  res.status(200).json({ message: 'Order received' });
});

app.listen(PORT, () => {
  console.log(`👻 Ghost Kitchen backend listening on port ${PORT}`);
});