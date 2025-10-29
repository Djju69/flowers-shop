// API клиент для Flowers Bot
const API_BASE = 'https://your-bot.railway.app'; // ЗАМЕНИТЕ НА ВАШ URL

/**
 * Получить список товаров
 * @param {string} category - Категория товаров (опционально)
 * @param {boolean} popular - Только популярные (опционально)
 */
async function getProducts(category = null, popular = null) {
  try {
    let url = `${API_BASE}/api/products`;
    const params = new URLSearchParams();
    
    if (category) params.append('category', category);
    if (popular !== null) params.append('popular', popular);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback: загрузить из localStorage
    const localProducts = JSON.parse(localStorage.getItem('products')) || [];
    return localProducts.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
      price: p.price,
      photo_url: p.image,
      is_popular: false
    }));
  }
}

/**
 * Получить товар по ID
 * @param {number} productId
 */
async function getProduct(productId) {
  try {
    const response = await fetch(`${API_BASE}/api/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Создать заказ
 * @param {object} orderData - Данные заказа
 */
async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * Получить заказы пользователя
 * @param {number} telegramId
 */
async function getUserOrders(telegramId) {
  try {
    const response = await fetch(`${API_BASE}/api/orders/${telegramId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

// Экспорт функций
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getProducts, getProduct, createOrder, getUserOrders };
}

