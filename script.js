const orderForm = document.getElementById('orderForm');
const nameInput = document.getElementById('nameInput');
const itemSelect = document.getElementById('itemSelect');
const orderList = document.getElementById('orderList');

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const order = {
    name: nameInput.value.trim(),
    item: itemSelect.value
  };

  await fetch('http://localhost:3000/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });

  nameInput.value = '';
  itemSelect.selectedIndex = 0;

  fetchOrders(); // Refresh the list
});

async function fetchOrders() {
  const res = await fetch('http://localhost:3000/orders');
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
}

fetchOrders();
setInterval(fetchOrders, 5000); // Update every 5 seconds