const ordersList = document.getElementById('ordersList');
const orderForm = document.getElementById('orderForm');
const nameInput = document.getElementById('nameInput');
const itemSelect = document.getElementById('itemSelect');

const backendURL = 'http://localhost:3000'; // update when deployed

function formatTime(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString(undefined, {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function renderOrders(orders) {
  ordersList.innerHTML = '';

  if (orders.length === 0) {
    ordersList.innerHTML = `
      <li class="italic text-gray-600 animate-pulse">no spirits have ordered yet...</li>
    `;
    return;
  }

  for (const order of orders) {
    const li = document.createElement('li');
    li.className = `
      bg-gray-800 border border-purple-600 p-4 rounded-md shadow-lg
      hover:bg-gray-700 transition-all duration-200
    `;

    li.innerHTML = `
      <div class="flex justify-between items-center">
        <span class="text-lg">${order.item}</span>
        <span class="text-sm text-purple-400 italic">${order.name}</span>
      </div>
      <p class="text-xs text-gray-400 mt-1">${formatTime(order.timestamp)}</p>
    `;
    ordersList.appendChild(li);
  }
}

async function fetchOrders() {
  try {
    const res = await fetch(`${backendURL}/orders`);
    const orders = await res.json();
    renderOrders(orders);
  } catch {
    ordersList.innerHTML = `
      <li class="text-red-500">👻 spirits failed to deliver the list</li>
    `;
  }
}

orderForm.addEventListener('submit', async e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const item = itemSelect.value;

  if (!name || !item) return alert('Enter your ghost name and cursed dish.');

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
      fetchOrders();
      alert(`🦴 Order from the void accepted, ${data.order.name} summoned ${data.order.item}`);
    } else {
      alert(data.error || 'Ghost kitchen rejected your order.');
    }
  } catch {
    alert('Ghost servers unreachable. Try again later.');
  }
});

fetchOrders();