const API_BASE_URL = 'https://ghost-kitchen-backend.onrender.com';

const orderForm = document.getElementById('order-form');
const nameInput = document.getElementById('name');
const itemInput = document.getElementById('item');
const orderList = document.getElementById('orders');

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const order = {
    name: nameInput.value.trim(),
    item: itemInput.value.trim()
  };

  await fetch(`${API_BASE_URL}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });

  nameInput.value = '';
  itemInput.value = '';

  fetchOrders(); // Refresh the list
});

async function fetchOrders() {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    const orders = await res.json();

    orderList.innerHTML = '';
    orders.forEach(order => {
      const li = document.createElement('li');
      li.className = 'bg-gray-800 p-3 rounded shadow hover:bg-gray-700 transition duration-200 flex justify-between items-center';
      li.innerHTML = `
        <span>${order.item}</span>
        <span class="text-purple-400 text-sm">${order.name}</span>
        <span class="text-xs text-gray-400">${new Date(order.timestamp).toLocaleString()}</span>
      `;
      orderList.appendChild(li);
    });
  } catch (error) {
    console.error('Failed to load orders.', error);
  }
}

fetchOrders();
setInterval(fetchOrders, 5000); // Update every 5 seconds