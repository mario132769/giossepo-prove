document.addEventListener('DOMContentLoaded', () => {
  const cartDrawer = document.getElementById('cart-drawer');
  const openCartBtn = document.getElementById('open-cart');
  const closeCartBtn = document.getElementById('close-cart');

  if (openCartBtn && cartDrawer) {
    openCartBtn.addEventListener('click', async () => {
      await updateCartDrawer();
      cartDrawer.classList.remove('hidden');
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      cartDrawer.classList.add('hidden');
    });
  }

  // "Agregar al carrito"
  document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      await updateCartDrawer();
      cartDrawer.classList.remove('hidden');
    });
  });

  // Botones + y - de cantidad en tiempo real
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('qty-plus') || e.target.classList.contains('qty-minus')) {
      const container = e.target.closest('[data-key]');
      const key = container.dataset.key;
      const qtyEl = container.querySelector('.qty-value');
      let currentQty = parseInt(qtyEl.textContent);
      const newQty = e.target.classList.contains('qty-plus') ? currentQty + 1 : currentQty - 1;
      if (newQty < 1) return;

      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: newQty })
      });

      await updateCartDrawer(); // Refresca en tiempo real
    }
  });

async function updateCartDrawer() {
  const res = await fetch('/cart.js');
  const cart = await res.json();

  // Drawer
  const cartDrawer = document.getElementById('cart-drawer');
  const cartItemsContainer = cartDrawer?.querySelector('.cart-items');
  const cartTotalEl = cartDrawer?.querySelector('#cart-total');

  if (cartItemsContainer && cartTotalEl) {
    cartItemsContainer.innerHTML = '';

    cart.items.forEach(item => {
      const itemHTML = `
        <div class="cart-item" data-key="${item.key}">
          <p>${item.product_title}</p>
          <div class="quantity-controls" data-key="${item.key}">
            <button class="qty-minus">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-plus">+</button>
          </div>
          <p>${(item.line_price / 100).toFixed(2)} €</p>
        </div>
      `;
      cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    cartTotalEl.textContent = `${(cart.total_price / 100).toFixed(2)} €`;
  }

  // Página de carrito
  const pageTotalEl = document.querySelector('#cart-page-total');
  if (pageTotalEl) {
    pageTotalEl.textContent = `${(cart.total_price / 100).toFixed(2)} €`;

    cart.items.forEach(item => {
      const itemEl = document.querySelector(`.cart-item[data-key="${item.key}"]`);
      if (itemEl) {
        itemEl.querySelector('.qty-value').textContent = item.quantity;
        itemEl.querySelector('p:last-child').textContent = `${(item.line_price / 100).toFixed(2)} €`;
      }
    });
  }

  // Actualiza contador del header
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = cart.item_count;
  });

  
}

  document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('cart-remove')) {
    const itemEl = e.target.closest('.cart-item');
    const key = itemEl.dataset.key;

    // Eliminar visualmente del DOM inmediatamente
    itemEl.remove();

    // Llama a Shopify para eliminar el producto (cantidad 0)
    await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: 0 })
    });

    // Actualiza totales y conteo sin reconstruir todo el DOM
    const res = await fetch('/cart.js');
    const cart = await res.json();

    // Actualiza total en la página
    const pageTotalEl = document.querySelector('#cart-page-total');
    if (pageTotalEl) {
      pageTotalEl.textContent = `${(cart.total_price / 100).toFixed(2)} €`;
    }

    // Actualiza contador del header
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = cart.item_count;
    });

    // Si tienes también un drawer, actualiza el total ahí
    const drawerTotalEl = document.querySelector('#cart-total');
    if (drawerTotalEl) {
      drawerTotalEl.textContent = `${(cart.total_price / 100).toFixed(2)} €`;
    }
  }
});



});
