// Загрузка товаров из localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Форма добавления
document.getElementById('productForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const product = {
    id: Date.now(),
    name: {
      ru: document.getElementById('nameRu').value,
      en: document.getElementById('nameEn').value || document.getElementById('nameRu').value,
      vi: document.getElementById('nameVi').value || document.getElementById('nameRu').value
    },
    description: {
      ru: document.getElementById('descRu').value,
      en: document.getElementById('descEn').value || document.getElementById('descRu').value,
      vi: document.getElementById('descVi').value || document.getElementById('descRu').value
    },
    price: parseInt(document.getElementById('price').value),
    category: document.getElementById('category').value,
    image: document.getElementById('imageUrl').value || 'images/placeholder.jpg',
    inStock: document.getElementById('inStock').checked
  };
  
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  
  alert('✅ Товар добавлен!');
  document.getElementById('productForm').reset();
  displayProducts();
});

// Отображение списка товаров
function displayProducts() {
  const list = document.getElementById('productsList');
  list.innerHTML = '';
  
  if (products.length === 0) {
    list.innerHTML = '<p style="text-align: center; color: var(--text-light);">Товары пока не добавлены</p>';
    return;
  }
  
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `
      <div class="product-info">
        <h3>${product.name.ru}</h3>
        <p>${product.price.toLocaleString()} VND</p>
      </div>
      <button class="btn-delete" onclick="deleteProduct(${product.id})">🗑️ Удалить</button>
    `;
    list.appendChild(div);
  });
}

// Удаление товара
function deleteProduct(id) {
  if (confirm('Удалить товар?')) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
  }
}

// Загрузка при старте
displayProducts();
