# 🚀 Инструкция по интеграции сайта с Telegram ботом

## ✅ ЧТО УЖЕ ГОТОВО

- ✅ Сайт на GitHub Pages: https://djju69.github.io/flowers-shop/
- ✅ FastAPI бэкенд с PostgreSQL
- ✅ API endpoints для товаров и заказов
- ✅ Файлы api.js и обновленный cart.js

---

## 📋 ЧТО НУЖНО СДЕЛАТЬ

### 1. Задеплоить FastAPI на Railway (или другой сервис)

**Шаги:**
1. Зайти на https://railway.app
2. Подключить GitHub репозиторий Flowersbot
3. Railway автоматически определит Python проект
4. Добавить PostgreSQL базу данных
5. Настроить environment variables

**Environment Variables:**
```bash
DATABASE_URL=postgresql://...
TELEGRAM_BOT_TOKEN=your_bot_token
ADMIN_CHAT_ID=your_admin_id
```

### 2. Получить URL вашего API

После деплоя Railway даст вам URL типа:
```
https://flowers-bot-api-production.up.railway.app
```

### 3. Обновить API_BASE в api.js

Откройте `flowers-shop-template/js/api.js` и замените:
```javascript
const API_BASE = 'https://your-bot.railway.app';
```
на ваш реальный URL:
```javascript
const API_BASE = 'https://flowers-bot-api-production.up.railway.app';
```

### 4. Добавить подключение к backend/main.py

Ваш `backend/main.py` не включает роуты. Добавьте:

```python
from routes import products, orders

app.include_router(products.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
```

### 5. Обновить catalog.html для чтения из API

Откройте `catalog.html` и перед `</body>` добавьте:

```html
<script src="js/api.js"></script>
<script>
  async function loadProducts() {
    const products = await getProducts();
    displayProducts(products);
  }
  
  // Заменить старую функцию
  document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // Вместо чтения из localStorage
  });
</script>
```

---

## 🔧 БЫСТРАЯ ПРОВЕРКА

1. Откройте сайт: https://djju69.github.io/flowers-shop/
2. Перейдите в каталог
3. Товары должны загружаться из API (не localStorage)
4. Добавьте товар в корзину
5. Нажмите "Оформить заказ"
6. Заказ должен появиться в вашем PostgreSQL

---

## 📱 СВЯЗЬ С TELEGRAM

**При создании заказа:**
1. Клиент на сайте нажимает "Оформить заказ"
2. Заказ отправляется в ваш FastAPI
3. API сохраняет в PostgreSQL
4. API отправляет уведомление админу в Telegram
5. Клиент видит подтверждение на сайте

**Код для уведомлений уже есть в:**
```
flower_shop/backend/utils/telegram_notify.py
```

---

## 🎯 СЛЕДУЮЩИЕ ШАГИ

1. **Деплой API** на Railway
2. **Обновить URL** в api.js
3. **Протестировать** создание заказа
4. **Добавить admin панель** (уже есть в backend/admin/)

---

## ⚠️ ВАЖНО

**Для сайта на GitHub Pages:**
- CORS должен быть настроен в вашем FastAPI (уже есть)
- API должен быть доступен по HTTPS
- Все запросы будут идти к вашему API серверу

**Если API не работает:**
- Сайт будет использовать localStorage (fallback)
- Товары можно добавлять через admin.html
- Заказы будут отправляться в Telegram напрямую

---

## 📞 НУЖНА ПОМОЩЬ?

Если что-то не работает:
1. Проверьте консоль браузера (F12)
2. Проверьте логи Railway
3. Убедитесь, что CORS настроен
4. Проверьте, что API доступен

