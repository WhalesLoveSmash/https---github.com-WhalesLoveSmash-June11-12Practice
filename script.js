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