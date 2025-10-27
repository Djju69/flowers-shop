# Отчёт о реорганизации структуры папок HTML-шаблона Fior

## Выполненные задачи

### 1. Создание стандартной структуры папок
Созданы следующие папки:
- `css/` - для CSS файлов
- `js/` - для JavaScript файлов
- `images/` - для изображений
- `fonts/` - для шрифтов
- `vendor/` - для сторонних библиотек

### 2. Перемещение файлов по категориям

#### CSS файлы (перемещены в папку `css/`):
- `bootstrap.css` → `vendor/bootstrap.css` (перенесён в vendor как сторонняя библиотека)
- `responsive.css` → `css/responsive.css`
- `style.css` → `css/style.css`
- `style.css.map` → `css/style.css.map`
- `style.scss` → `css/style.scss`

#### JavaScript файлы (перемещены в папки `js/` и `vendor/`):
- `bootstrap.js` → `vendor/bootstrap.js` (сторонняя библиотека)
- `custom.js` → `js/custom.js`
- `jquery-3.4.1.min.js` → `vendor/jquery-3.4.1.min.js` (сторонняя библиотека)

#### Изображения (перемещены в папку `images/`):
- `about-1.png` → `images/about-1.png`
- `about-2.png` → `images/about-2.png`
- `about-img.png` → `images/about-img.png`
- `arrangement.jpg` → `images/arrangement.jpg`
- `cart.png` → `images/cart.png`
- `client-1.png` → `images/client-1.png`
- `client-2.png` → `images/client-2.png`
- `envelope-white.png` → `images/envelope-white.png`
- `flower.png` → `images/flower.png`
- `flowers.png` → `images/flowers.png`
- `g-1.jpg` → `images/g-1.jpg`
- `g-2.jpg` → `images/g-2.jpg`
- `g-3.jpg` → `images/g-3.jpg`
- `g-4.jpg` → `images/g-4.jpg`
- `g-5.jpg` → `images/g-5.jpg`
- `g-6.jpg` → `images/g-6.jpg`
- `g-7.jpg` → `images/g-7.jpg`
- `g-8.jpg` → `images/g-8.jpg`
- `hero.png` → `images/hero.png`
- `insta-1.png` → `images/insta-1.png`
- `insta-2.png` → `images/insta-2.png`
- `insta-3.png` → `images/insta-3.png`
- `insta-4.png` → `images/insta-4.png`
- `insta-5.png` → `images/insta-5.png`
- `insta-6.png` → `images/insta-6.png`
- `location-white.png` → `images/location-white.png`
- `menu.png` → `images/menu.png`
- `next.png` → `images/next.png`
- `play.png` → `images/play.png`
- `prev.png` → `images/prev.png`
- `rose.png` → `images/rose.png`
- `search-icon.png` → `images/search-icon.png`
- `telephone-white.png` → `images/telephone-white.png`
- `tulip.png` → `images/tulip.png`
- `why-bg.jpg` → `images/why-bg.jpg`

#### Шрифты (перемещены в папку `fonts/`):
- `ethnocentric rg it.ttf` → `fonts/ethnocentric rg it.ttf`
- `ethnocentric rg.ttf` → `fonts/ethnocentric rg.ttf`
- `Poppins-Bold.ttf` → `fonts/Poppins-Bold.ttf`
- `Poppins-Regular.ttf` → `fonts/Poppins-Regular.ttf`

#### Сторонние библиотеки (перемещены в папку `vendor/`):
- `bootstrap.css` → `vendor/bootstrap.css`
- `bootstrap.js` → `vendor/bootstrap.js`
- `jquery-3.4.1.min.js` → `vendor/jquery-3.4.1.min.js`

### 3. Обновление путей в HTML файлах

Обновлены пути к файлам в следующих HTML файлах:
- `index.html`
- `about.html`
- `gallery.html`
- `contact.html`

#### Изменения в путях:
- `css/bootstrap.css` → `vendor/bootstrap.css`
- `js/jquery-3.4.1.min.js` → `vendor/jquery-3.4.1.min.js`
- `js/bootstrap.js` → `vendor/bootstrap.js`

### 4. Финальная структура проекта

```
flowers-shop-template/
├── css/
│   ├── responsive.css
│   ├── style.css
│   ├── style.css.map
│   └── style.scss
├── fonts/
│   ├── ethnocentric rg it.ttf
│   ├── ethnocentric rg.ttf
│   ├── Poppins-Bold.ttf
│   └── Poppins-Regular.ttf
├── images/
│   ├── about-1.png
│   ├── about-2.png
│   ├── about-img.png
│   ├── arrangement.jpg
│   ├── cart.png
│   ├── client-1.png
│   ├── client-2.png
│   ├── envelope-white.png
│   ├── flower.png
│   ├── flowers.png
│   ├── g-1.jpg до g-8.jpg
│   ├── hero.png
│   ├── insta-1.png до insta-6.png
│   ├── location-white.png
│   ├── menu.png
│   ├── next.png
│   ├── play.png
│   ├── prev.png
│   ├── rose.png
│   ├── search-icon.png
│   ├── telephone-white.png
│   ├── tulip.png
│   └── why-bg.jpg
├── js/
│   └── custom.js
├── vendor/
│   ├── bootstrap.css
│   ├── bootstrap.js
│   └── jquery-3.4.1.min.js
├── about.html
├── contact.html
├── gallery.html
├── index.html
├── OFL.txt
├── read-this.html
├── README.md
└── typodermic-eula-02-2014.pdf
```

## Результат

✅ Все файлы успешно перемещены в соответствующие папки согласно стандартной структуре HTML-проекта
✅ Пути к файлам в HTML обновлены для корректной работы сайта
✅ Структура проекта стала более организованной и профессиональной
✅ Сайт готов к локальному запуску

## Примечания

- Имена файлов не изменялись согласно требованиям
- Все ссылки на изображения уже использовали правильный путь `images/`
- Сторонние библиотеки (Bootstrap, jQuery) выделены в отдельную папку `vendor/`
- Структура соответствует современным стандартам веб-разработки
