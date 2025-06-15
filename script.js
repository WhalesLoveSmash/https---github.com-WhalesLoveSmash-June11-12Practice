const orderForm = document.getElementById('order-form');
const nameInput = document.getElementById('name');
const itemSelect = document.getElementById('item');
const orderList = document.getElementById('orders');

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const order = {
    name: nameInput.value.trim(),
    item: itemSelect.value
  };

  if (!order.name || !order.item) {
    alert('Please enter your name and select an item.');
    return;
  }

  try {
    await fetch('/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });

    nameInput.value = '';
    itemSelect.selectedIndex = 0;

    fetchOrders();
  } catch (error) {
    alert('Failed to send order. Try again.');
    console.error(error);
  }
});

async function fetchOrders() {
  try {
    const res = await fetch('/orders');
    const orders = await res.json();

    orderList.innerHTML = '';
    orders.forEach(order => {
      const li = document.createElement('li');
      li.className = 'bg-gray-800 p-3 rounded shadow hover:bg-gray-700 transition duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0';
      li.innerHTML = `
        <span class="font-semibold text-lg">${order.item}</span>
        <span class="text-purple-400 text-sm">${order.name}</span>
        <span class="text-xs text-gray-400">${new Date(order.timestamp).toLocaleString()}</span>
      `;
      orderList.appendChild(li);
    });
  } catch (error) {
    orderList.innerHTML = '<li class="text-red-500">Failed to load orders.</li>';
    console.error(error);
  }
}

fetchOrders();
setInterval(fetchOrders, 5000);