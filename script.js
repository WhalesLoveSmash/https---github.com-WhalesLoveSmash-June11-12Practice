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

  await fetch('http://localhost:3000/order', {
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
    const res = await fetch('http://localhost:3000/orders');
    const orders = await res.json();

    orderList.innerHTML = '';
    orders.forEach(order => {
      const li = document.createElement('li');
      li.className = 'bg-gray-800 p-3 rounded shadow hover:bg-gray-700 transition duration-200 flex justify-between items-center space-x-4';
      li.innerHTML = `
        <span class="flex-[3]">${order.item}</span>
        <span class="flex-[2] text-purple-400 text-sm">${order.name}</span>
        <span class="flex-[3] text-xs text-gray-400 text-right">${new Date(order.timestamp).toLocaleString()}</span>
      `;
      orderList.appendChild(li);
    });
  } catch (err) {
    console.error('Failed to load orders.', err);
  }
}

fetchOrders();
setInterval(fetchOrders, 5000); // Update every 5 seconds