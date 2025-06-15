const ordersList = document.getElementById('ordersList');
const orderForm = document.getElementById('orderForm');
const nameInput = document.getElementById('nameInput');
const itemSelect = document.getElementById('itemSelect');

const backendURL = 'http://localhost:3000'; // change this on deploy

// Format timestamp to friendly local time
function formatTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

// Render all orders
function renderOrders(orders) {
  ordersList.innerHTML = '';
  if (orders.length === 0) {
    ordersList.innerHTML = '<li class="italic text-gray-500">No orders yet, be the first!</li>';
    return;
  }
  for (const order of orders) {
    const li = document.createElement('li');
    li.className = 'bg-gray-800 p-4 rounded shadow hover:bg-gray-700 transition cursor-default';
    li.innerHTML = `
      <p><span class="font-semibold">${order.name}</span> ordered <span class="italic">${order.item}</span></p>
      <p class="text-xs text-gray-400 mt-1">${formatTime(order.timestamp)}</p>
    `;
    ordersList.appendChild(li);
  }
}

// Fetch and refresh orders from backend
async function fetchOrders() {
  try {
    const res = await fetch(`${backendURL}/orders`);
    const orders = await res.json();
    renderOrders(orders);
  } catch {
    ordersList.innerHTML = '<li class="text-red-500">Failed to load orders :(</li>';
  }
}

// Handle order form submit
orderForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const item = itemSelect.value;

  if (!name || !item) return alert('Please enter your name and select an item.');

  try {
    const res = await fetch(`${backendURL}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, item }),
    });
    const data = await res.json();
    if (res.ok) {
      nameInput.value = '';
      itemSelect.value = '';
      fetchOrders(); // refresh orders live
      alert(`Thanks ${data.order.name}, your order for ${data.order.item} is spooky and received!`);
    } else {
      alert(data.error || 'Failed to place order.');
    }
  } catch {
    alert('Error connecting to server.');
  }
});

// Initial fetch on page load
fetchOrders();