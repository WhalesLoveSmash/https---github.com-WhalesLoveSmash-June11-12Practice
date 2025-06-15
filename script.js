fetch('http://localhost:3000/')
  .then(response => response.text())
  .then(data => {
    console.log('Backend says:', data);
    // Show the message on the page too, optional
    const msgEl = document.createElement('p');
    msgEl.textContent = `Backend says: ${data}`;
    document.body.appendChild(msgEl);
  })
  .catch(err => console.error('Fetch error:', err));

  function sendFakeOrder() {
  const fakeOrder = {
    item: 'Whailing Banshee Burger',
    quantity: 1
  };

  fetch('http://localhost:3000/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fakeOrder)
  })
  .then(res => res.json())
  .then(data => {
    console.log('Backend response:', data);
    alert('Order sent successfully!');
  })
  .catch(err => {
    console.error('Order failed:', err);
  });
}