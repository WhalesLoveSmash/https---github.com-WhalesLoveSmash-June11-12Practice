const API_BASE = 'http://localhost:3000';  // Change when deployed

// On page load, fetch and show orders
window.onload = fetchAndUpdateOrders;

function fetchAndUpdateOrders() {
  fetch(`${API_BASE}/orders`)
    .then(res => res.json())
    .then(orders => {
      updateOrderBoard(orders);
    })
    .catch(err => {
      console.error('Failed to fetch orders:', err);
      const orderBoard = document.getElementById('orderBoard');
      orderBoard.textContent = '👻 The haunted server is silent...';
    });
}

// Update the order board UI
function updateOrderBoard(orders) {
  const orderBoard = document.getElementById('orderBoard');
  orderBoard.innerHTML = '';

  if (!orders || orders.length === 0) {
    const msg = document.createElement('p');
    msg.className = 'italic text-purple-500 select-none';
    msg.textContent = 'No ghost orders yet... Dare to be the first?';
    orderBoard.appendChild(msg);
    return;
  }

  // Show only last 5 orders, newest first
  const recentOrders = orders.slice(-5).reverse();

  recentOrders.forEach(({ name, item, quantity, timestamp }) => {
    const orderEl = document.createElement('p');
    orderEl.className = 'mb-1 text-purple-300';
    const timeAgo = timeSince(new Date(timestamp));
    orderEl.textContent = `${name} summoned ${quantity}x ${item} — ${timeAgo} ago`;
    orderBoard.appendChild(orderEl);
  });
}

// Helper to get human-readable relative time
function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours !== 1 ? 's' : ''}`;
}

// Prompt user for name, send order, update board
function promptAndSendOrder() {
  const name = prompt('Enter your ghostly name (max 20 chars):').trim().slice(0, 20);
  if (!name) {
    alert('You must enter a name to summon an order!');
    return;
  }

  const order = {
    name,
    item: 'Whailing Banshee Burger',
    quantity: 1,
    timestamp: new Date().toISOString()
  };

  fetch(`${API_BASE}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
    .then(res => res.json())
    .then(data => {
      alert('Your order has been summoned!');
      fetchAndUpdateOrders();
    })
    .catch(err => {
      console.error('Order failed:', err);
      alert('Something spooky went wrong. Try again later.');
    });
}