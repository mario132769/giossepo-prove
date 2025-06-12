document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      updateCartDrawer();
    });
  });

  async function updateCartDrawer() {
    const response = await fetch('/cart.js');
    const cart = await response.json();

    const cartDrawer = document.querySelector('#cart-drawer');
    const cartItems = cartDrawer.querySelector('.cart-items');
    cartItems.innerHTML = '';

    cart.items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `
        <p>${item.product_title} x ${item.quantity}</p>
        <p>${(item.final_line_price / 100).toFixed(2)} €</p>
      `;
      cartItems.appendChild(itemElement);
    });

    document.querySelector('#cart-total').textContent = `${(cart.total_price / 100).toFixed(2)} €`;
    cartDrawer.classList.remove('hidden');
  }

  document.getElementById('close-cart').addEventListener('click', function () {
    document.querySelector('#cart-drawer').classList.add('hidden');
  });
});
