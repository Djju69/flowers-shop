// Корзина товаров
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновление счетчика корзины
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

// Добавление товара в корзину
function addToCart(productId) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    alert('Товар не найден!');
    return;
  }
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  // Показать уведомление
  alert('Товар добавлен в корзину!');
}

// Удаление товара из корзины
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// Отображение корзины
function displayCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const emptyCart = document.getElementById('emptyCart');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '';
    cartTotal.style.display = 'none';
    emptyCart.style.display = 'block';
    return;
  }
  
  emptyCart.style.display = 'none';
  cartTotal.style.display = 'block';
  
  const currentLang = localStorage.getItem('language') || 'ru';
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name[currentLang]}">
      <div class="cart-item-info">
        <h3>${item.name[currentLang]}</h3>
        <p>${item.price.toLocaleString()} VND × ${item.quantity}</p>
      </div>
      <button class="btn-remove" onclick="removeFromCart(${item.id})">
        🗑️ Удалить
      </button>
    </div>
  `).join('');
  
  // Подсчет общей суммы
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('totalPrice').textContent = total.toLocaleString() + ' VND';
}

// Оформление заказа
function checkout() {
  if (cart.length === 0) {
    alert('Корзина пуста!');
    return;
  }
  
  const currentLang = localStorage.getItem('language') || 'ru';
  const orderText = cart.map(item => {
    return `${item.name[currentLang]} × ${item.quantity} - ${(item.price * item.quantity).toLocaleString()} VND`;
  }).join('\n');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const message = `Здравствуйте! Я хочу оформить заказ:\n\n${orderText}\n\nИтого: ${total.toLocaleString()} VND`;
  
  // Перенаправление на Telegram бота
  window.open(`https://t.me/nhatrangflowers_bot?text=${encodeURIComponent(message)}`, '_blank');
  
  // Очистить корзину после отправки
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  if (document.getElementById('cartItems')) {
    displayCart();
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  
  // Если на странице корзины - отобразить товары
  if (document.getElementById('cartItems')) {
    displayCart();
  }
});
