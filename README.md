# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Типы данных проекта "Веб-Ларёк"

## **Базовый код**

### **Класс ApiClient**

Класс, отвечающий за взаимодействие с серверным API. Реализует методы получения и отправки данных.

#### Методы:

- **getProducts**  
  Возвращает список товаров.  
  **Пример:**  
  ```typescript
  const products = await apiClient.getProducts();
  ```
  **Возвращает:** `Promise<ApiProduct[]>`

- **getProductById**  
  Получает данные товара по идентификатору.  
  **Пример:**  
  ```typescript
  const product = await apiClient.getProductById("123");
  ```
  **Возвращает:** `Promise<ApiProduct>`

- **createOrder**  
  Создает новый заказ.  
  **Пример:**  
  ```typescript
  const order = await apiClient.createOrder(orderData);
  ```
  **Возвращает:** `Promise<ApiOrder>`

- **getOrderById**  
  Возвращает данные заказа.  
  **Пример:**  
  ```typescript
  const order = await apiClient.getOrderById("456");
  ```
  **Возвращает:** `Promise<ApiOrder>`

- **getUser**  
  Возвращает данные пользователя.  
  **Пример:**  
  ```typescript
  const user = await apiClient.getUser("789");
  ```
  **Возвращает:** `Promise<ApiUser>`

## **Компоненты модели данных (бизнес-логика)**

### **Класс ProductModel**

Отвечает за бизнес-логику, связанную с товарами.

#### Методы:

- **getAll**  
  Возвращает список товаров для отображения.  
  **Пример:**  
  ```typescript
  const products = await productModel.getAll();
  ```
  **Возвращает:** `Promise<DisplayProduct[]>`

- **getById**  
  Возвращает данные конкретного товара для отображения.  
  **Пример:**  
  ```typescript
  const product = await productModel.getById("123");
  ```
  **Возвращает:** `Promise<DisplayProduct>`

### **Класс CartModel**

Реализует бизнес-логику для работы с корзиной.

#### Методы:

- **addToCart**  
  Добавляет товар в корзину.  
  **Пример:**  
  ```typescript
  cartModel.addToCart("123", 2);
  ```

- **removeFromCart**  
  Удаляет товар из корзины.  
  **Пример:**  
  ```typescript
  cartModel.removeFromCart("123");
  ```

- **getCartItems**  
  Возвращает список товаров в корзине.  
  **Пример:**  
  ```typescript
  const items = cartModel.getCartItems();
  ```
  **Возвращает:** `CartItem[]`

- **clearCart**  
  Очищает корзину.  
  **Пример:**  
  ```typescript
  cartModel.clearCart();
  ```
### **Класс OrderModel**

Обрабатывает бизнес-логику, связанную с заказами.

#### Методы:

- **placeOrder**  
  Создает заказ на основе товаров в корзине.  
  **Пример:**  
  ```typescript
  const order = await orderModel.placeOrder(cartItems);
  ```
  **Возвращает:** `Promise<DisplayOrder>`

- **getOrder**  
  Получает данные о заказе.  
  **Пример:**  
  ```typescript
  const order = await orderModel.getOrder("456");
  ```
  **Возвращает:** `Promise<DisplayOrder>`

## **Компоненты представления**

### **Компонент ProductCard**

Карточка товара для отображения на экране.

#### Свойства:

- **product**  
  Данные товара для отображения.  
  **Тип:** `DisplayProduct`

- **onAddToCart**  
  Обработчик для добавления товара в корзину.  
  **Тип:** `(productId: string) => void`

### **Компонент Cart**

Представление корзины.

#### Свойства:

- **items**  
  Список товаров в корзине.  
  **Тип:** `CartItem[]`

- **onRemoveFromCart**  
  Обработчик для удаления товара из корзины.  
  **Тип:** `(productId: string) => void`

- **onCheckout**  
  Обработчик для оформления заказа.  
  **Тип:** `() => void`

### **Компонент Order**

Отображение данных о заказе.

#### Свойства:

- **order**  
  Данные заказа.  
  **Тип:** `DisplayOrder`

## **Ключевые типы данных**

### **ApiProduct**
```typescript
interface ApiProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}
```

### **DisplayProduct**
```typescript
interface DisplayProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}
```

### **CartItem**
```typescript
interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: string;
  totalPrice: string;
}
```

### **DisplayOrder**
```typescript
interface DisplayOrder {
  id: string;
  products: CartItem[];
  total: string;
  status: string;
}
```
