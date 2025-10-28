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
      <div class="product-actions">
        <button class="btn-edit" onclick="editProduct(${product.id})">✏️ Редактировать</button>
        <button class="btn-delete" onclick="deleteProduct(${product.id})">🗑️ Удалить</button>
      </div>
    `;
    list.appendChild(div);
  });
}

// Редактирование товара
let editingId = null;

function editProduct(id) {
  editingId = id;
  const product = products.find(p => p.id === id);
  
  if (!product) return;
  
  // Заполнить форму данными товара
  document.getElementById('nameRu').value = product.name.ru;
  document.getElementById('nameEn').value = product.name.en;
  document.getElementById('nameVi').value = product.name.vi;
  document.getElementById('descRu').value = product.description.ru;
  document.getElementById('descEn').value = product.description.en;
  document.getElementById('descVi').value = product.description.vi;
  document.getElementById('price').value = product.price;
  document.getElementById('category').value = product.category;
  document.getElementById('imageUrl').value = product.image;
  document.getElementById('inStock').checked = product.inStock;
  
  // Изменить заголовок формы
  document.querySelector('.btn-submit').textContent = '💾 Сохранить изменения';
  
  // Прокрутить к форме
  document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
}

// Обновить форму добавления
document.getElementById('productForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const product = {
    id: editingId || Date.now(),
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
  
  if (editingId) {
    // Обновление существующего товара
    const index = products.findIndex(p => p.id === editingId);
    if (index !== -1) {
      products[index] = product;
      alert('✅ Товар обновлен!');
    }
    editingId = null;
    document.querySelector('.btn-submit').textContent = '➕ Добавить товар';
  } else {
    // Добавление нового товара
    products.push(product);
    alert('✅ Товар добавлен!');
  }
  
  localStorage.setItem('products', JSON.stringify(products));
  document.getElementById('productForm').reset();
  displayProducts();
});

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
