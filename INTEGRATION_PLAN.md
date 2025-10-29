# ПЛАН ИНТЕГРАЦИИ: Flowers-Shop + Telegram Bot

## 🎯 ЦЕЛЬ
Связать статичный HTML сайт с вашим FastAPI ботом для полноценной работы магазина.

---

## 📋 ТЕКУЩАЯ СИТУАЦИЯ

### У вас есть:
- ✅ **flowers-shop** (HTML сайт на GitHub Pages)
- ✅ **Flowersbot** (FastAPI + PostgreSQL бот)
- ✅ **API endpoints** в боте

### Нужно сделать:
- 🔄 Заменить localStorage на API запросы
- 🔗 Подключить сайт к вашему FastAPI backend
- 📦 Реализовать корзину и заказы через API

---

## 🔧 ПЛАН ДЕЙСТВИЙ

### 1. Проверить API вашего бота

**Нужно найти в Flowersbot:**
```
api/
  products/    # Товары
  orders/      # Заказы
  users/       # Пользователи
```

**Endpoints которые должны быть:**
```python
GET /api/products           # Список товаров
GET /api/products/{id}      # Детали товара
POST /api/orders            # Создать заказ
GET /api/orders/{user_id}   # История заказов
```

### 2. Создать API клиент для сайта

**Файл: `js/api.js`**
```javascript
const API_BASE = 'https://your-bot.railway.app'; // Замените на ваш URL

// Получить товары
async function getProducts() {
  const response = await fetch(`${API_BASE}/api/products`);
  return response.json();
}

// Создать заказ
async function createOrder(orderData) {
  const response = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return response.json();
}
```

### 3. Обновить catalog.html

**Вместо:**
```javascript
// Старый код (читает из localStorage)
const products = JSON.parse(localStorage.getItem('products')) || [];
```

**Новый код:**
```javascript
// Новый код (читает из API)
async function loadProducts() {
  const products = await getProducts();
  displayProducts(products);
}

loadProducts();
```

### 4. Обновить cart.js

**Добавить API интеграцию:**
```javascript
async function checkout(orderData) {
  try {
    // Отправить заказ в API
    const result = await createOrder({
      items: cart,
      customer_info: orderData,
      total: calculateTotal()
    });
    
    // Показать успешное сообщение
    alert(`Заказ #${result.order_id} принят!`);
    
    // Отправить уведомление в Telegram
    window.open(`https://t.me/nhatrangflowers_bot?text=Заказ%20создан`);
    
  } catch (error) {
    alert('Ошибка при создании заказа');
  }
}
```

---

## 🚀 ДЕПЛОЙ API

### Вариант 1: Railway (рекомендую)
```
1. Зайти на railway.app
2. Подключить GitHub репозиторий Flowersbot
3. Добавить PostgreSQL базу
4. Задеплоить API
5. Получить URL: https://your-bot.up.railway.app
```

### Вариант 2: Heroku
```
1. Установить Heroku CLI
2. heroku create flowers-bot-api
3. heroku addons:create heroku-postgresql
4. git push heroku main
```

---

## 📝 ЧЕКЛИСТ ИНТЕГРАЦИИ

- [ ] Проверить, что Flowersbot API работает
- [ ] Добавить CORS разрешения для сайта
- [ ] Создать js/api.js с функциями запросов
- [ ] Обновить catalog.html для чтения из API
- [ ] Обновить cart.js для создания заказов через API
- [ ] Протестировать создание заказа
- [ ] Настроить уведомления админу в Telegram

---

## 🔗 СВЯЗЬ С TELEGRAM

**Когда клиент оформляет заказ на сайте:**
1. Сайт → POST /api/orders → FastAPI
2. FastAPI сохраняет в PostgreSQL
3. FastAPI → отправляет уведомление админу в Telegram
4. Клиент видит "Заказ принят" на сайте

**Для уведомлений в боте использовать:**
```python
# В вашем Flowersbot
from telegram import Bot

async def notify_admin(order_data):
    bot = Bot(token="YOUR_BOT_TOKEN")
    await bot.send_message(
        chat_id=ADMIN_CHAT_ID,
        text=f"Новый заказ #{order_data['id']}"
    )
```

---

## 🎨 СЛЕДУЮЩИЙ ШАГ

Проверьте ваш Flowersbot и найдите:
1. Какой URL у вашего API?
2. Какие endpoints есть?
3. Есть ли CORS настройки?

После этого я подключу сайт к вашему API! 🚀

