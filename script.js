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

  if (!order.name || !order.item) return;

  try {
    await fetch('http://localhost:3000/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });

    nameInput.value = '';
    itemInput.value = '';

    fetchOrders(); // Refresh orders after submitting
  } catch (error) {
    console.error('Failed to send order:', error);
  }
});

async function fetchOrders() {
  try {
    const res = await fetch('http://localhost:3000/orders');
    if (!res.ok) throw new Error('Network response was not ok');
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
    console.error('Failed to load orders:', error);
    orderList.innerHTML = '<li class="text-red-500">Failed to load orders.</li>';
  }
}

fetchOrders();
setInterval(fetchOrders, 5000); // Refresh every 5 seconds