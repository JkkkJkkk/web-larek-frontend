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

## **Компоненты модели данных (бизнес-логика)**

## **Класс ProductModel**
Отвечает за бизнес-логику, связанную с товарами.

### **Поля**
- `products: DisplayProduct[]` — массив товаров.
- `product: DisplayProduct | null` — конкретный товар для отображения.

### **Методы**
- **`setProducts(products: DisplayProduct[]): void`**  
  Сохраняет список товаров в модель.  
  ```typescript
  productModel.setProducts(products);
  ```

- **`setProduct(product: DisplayProduct | null): void`**  
  Сохраняет данные конкретного товара в модель.  
  ```typescript
  productModel.setProduct(product);
  ```

- **`getAll(): DisplayProduct[]`**  
  Возвращает список всех товаров из модели.  
  ```typescript
  const allProducts = productModel.getAll();
  ```

- **`getById(id: string): DisplayProduct | undefined`**  
  Возвращает данные конкретного товара по его идентификатору.  
  ```typescript
  const product = productModel.getById("123");
  ```

## **Класс CartModel**
Реализует бизнес-логику для работы с корзиной.

### **Поля**
- `cartItems: CartItem[]` — список товаров в корзине.

### **Методы**
- **`addToCart(productId: string, quantity: number): void`**  
  Добавляет товар в корзину.  
  ```typescript
  cartModel.addToCart("123", 2);
  ```

- **`removeFromCart(productId: string): void`**  
  Удаляет товар из корзины.  
  ```typescript
  cartModel.removeFromCart("123");
  ```

- **`getCartItems(): CartItem[]`**  
  Возвращает список товаров в корзине.  
  ```typescript
  const items = cartModel.getCartItems();
  ```

- **`clearCart(): void`**  
  Очищает корзину.  
  ```typescript
  cartModel.clearCart();
  ```

## **Класс OrderModel**
Обрабатывает бизнес-логику, связанную с заказами.

### **Поля**
- `order: DisplayOrder | null` — текущий заказ.
- `orderData: OrderFormData | null` — данные для создания нового заказа.

### **Методы**
- **`setOrder(order: DisplayOrder): void`**  
  Сохраняет данные о заказе в модель.  
  ```typescript
  orderModel.setOrder(order);
  ```

- **`getOrder(): DisplayOrder | null`**  
  Возвращает текущий заказ.  
  ```typescript
  const order = orderModel.getOrder();
  ```

- **`prepareOrderData(cartItems: CartItem[]): OrderFormData`**  
  Подготавливает данные для отправки заказа.  
  ```typescript
  const orderData = orderModel.prepareOrderData(cartItems);
  ```

- **`setOrderData(orderData: OrderFormData): void`**  
  Сохраняет данные для нового заказа.  
  ```typescript
  orderModel.setOrderData(orderData);
  ```

## **Компоненты представления**

### **Компонент ProductCard**

Представление карточки товара, которое отображает информацию о товаре на экране.

#### Свойства:
- **product** — Данные товара для отображения. **Тип:** `DisplayProduct`

#### Методы:
- **renderCard()** — Отображает карточку товара на экране (название, изображение, цена и описание).
- **updateCard(product: DisplayProduct)** — Обновляет информацию о товаре в карточке.
- **setAddToCartHandler(handler: (productId: string) => void)** — Устанавливает обработчик для события добавления товара в корзину.

### **Компонент Cart**

Представление корзины с товарами, где пользователь может управлять содержимым корзины.

#### Свойства:
- **items** — Список товаров в корзине. **Тип:** `CartItem[]`
- **onRemoveFromCart** — Обработчик для удаления товара из корзины. **Тип:** `(productId: string) => void`
- **onCheckout** — Обработчик для оформления заказа. **Тип:** `() => void`

#### Методы:
- **renderCart()** — Отображает список товаров в корзине.
- **updateCartItems(cartItems: CartItem[])** — Обновляет список товаров в корзине на экране.
- **setRemoveFromCartHandler(handler: (productId: string) => void)** — Устанавливает обработчик для удаления товара из корзины.
- **setCheckoutHandler(handler: () => void)** — Устанавливает обработчик для перехода к оформлению заказа.

### **Компонент Order**

Представление для отображения заказа.

#### Свойства:
- **order** — Данные заказа. **Тип:** `DisplayOrder`

### **Класс OrderSummary**

Отвечает за отображение сводной информации о заказе.

#### Свойства:
- **order** — Данные заказа для отображения. **Тип:** `DisplayOrder`

#### Методы:
- **renderSummary()** — Отображает сводную информацию о заказе (список товаров, общая сумма, статус).
- **updateSummary(order: DisplayOrder)** — Обновляет информацию о заказе на экране.

### **Класс OrderForm**

Отвечает за отображение формы оформления заказа.

#### Свойства:
- **formElement** — DOM-элемент формы. **Тип:** `HTMLFormElement`

#### Методы:
- **renderForm()** — Рендерит форму для ввода данных пользователя (например, имя, адрес, телефон).
- **getFormData()** — Возвращает данные, введенные в форму, для отправки на сервер. **Тип:** `OrderFormData`

### **Компонент ProductListView**

Представление списка товаров.

#### Свойства:
- **products** — Список товаров для отображения. **Тип:** `DisplayProduct[]`
- **onProductClick** — Обработчик для перехода на страницу деталей товара. **Тип:** `(productId: string) => void`

#### Методы:
- **renderProductList()** — Отображает список товаров (карточки товаров).
- **updateProductList(products: DisplayProduct[])** — Обновляет список товаров на экране.
- **setProductClickHandler(handler: (productId: string) => void)** — Устанавливает обработчик для клика по товару.

### **Компонент ProductDetailsView**

Представление для отображения подробной информации о выбранном товаре.

#### Свойства:
- **product** — Данные товара для отображения. **Тип:** `DisplayProduct`
- **onAddToCart** — Обработчик для добавления товара в корзину. **Тип:** `(productId: string) => void`

#### Методы:
- **renderProductDetails()** — Отображает подробную информацию о товаре.
- **updateProductDetails(product: DisplayProduct)** — Обновляет информацию о товаре.

### **Компонент CheckoutView**

Представление для оформления заказа.

#### Свойства:
- **order** — Данные заказа для отображения. **Тип:** `DisplayOrder`
- **onSubmit** — Обработчик для отправки формы оформления заказа. **Тип:** `(formData: OrderFormData) => void`

#### Методы:
- **renderCheckoutForm()** — Отображает форму оформления заказа (поля для ввода данных пользователя).
- **submitCheckout()** — Обрабатывает отправку формы и передает данные в обработчик.
- **updateCheckoutView(order: DisplayOrder)** — Обновляет информацию на странице оформления заказа.

### **Компонент OrderConfirmationView**

Представление для подтверждения заказа после оформления.

#### Свойства:
- **order** — Данные заказа для отображения. **Тип:** `DisplayOrder`
- **onOrderComplete** — Обработчик для завершения заказа. **Тип:** `() => void`

#### Методы:
- **renderOrderConfirmation()** — Отображает информацию о заказе (список товаров, общая сумма, статус).
- **updateOrderConfirmation(order: DisplayOrder)** — Обновляет информацию о заказе на странице подтверждения.
- **completeOrder()** — Завершает процесс оформления заказа.

# Взаимодействие между представлением и моделями

## Общий процесс взаимодействия

1. **Загрузка данных с сервера (API)**
   - Представление, например, `ProductListView`, запрашивает список товаров через `ApiClient.getProducts()`.
   - Полученные данные передаются в модель, например, в `ProductModel`, где они сохраняются через метод `setProducts()`.
   - Модель уведомляет представление, что данные обновились, и компонент рендерит эти данные на экране.

2. **Добавление товара в корзину**
   - Когда пользователь добавляет товар в корзину через компонент `ProductCard`, представление вызывает метод модели `CartModel.addToCart()`.
   - Модель обновляет список товаров в корзине, и компонент `Cart` получает обновленные данные для рендеринга.

3. **Оформление заказа**
   - После того как товары добавлены в корзину, представление вызывает метод `OrderModel.prepareOrderData()` для подготовки данных заказа.
   - Когда пользователь заполняет форму, представление вызывает `OrderModel.setOrderData()` для сохранения данных формы в модели.
   - При подтверждении заказа данные отправляются на сервер через `ApiClient.createOrder()` и сохраняются в `OrderModel`.

4. **Обновление представления**
   - Модели данных отправляют уведомления о том, что данные изменились. Представления, такие как `CartView` или `ProductListView`, обновляют UI с новыми данными, вызывая методы обновления (например, `updateCartItems()` или `renderProductList()`).

## Взаимодействие с API

- **ApiClient** обрабатывает все запросы к серверу и использует методы для получения и отправки данных, такие как `getProducts()`, `getProductById()`, `createOrder()`.
- Модели данных (`ProductModel`, `CartModel`, `OrderModel`) используют эти данные для обновления состояния приложения, и представления обновляют UI на основе этих данных.

## **Ключевые типы данных**

### **ApiProduct**+
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

### **OrderFormData**
```typescript
interface OrderFormData {
  name: string;
  address: string;
  phone: string;
  [key: string]: string;
}
```

### **ApiOrder**
```typescript
interface ApiOrder {
  id: string;
  products: ApiCartItem[];
  total: number;
  status: string;
}
```

### **ApiCartItem**
```typescript
interface ApiCartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number; // Для серверных расчетов цена может быть числом
  totalPrice: number;
}
```

### **Cart**
```typescript
interface Cart {
  items: CartItem[];
  totalPrice: string; // Общая стоимость корзины
}
```

### **ProductList**
```typescript
interface ProductList {
  products: DisplayProduct[];
}
```

### **CheckoutData**
```typescript
interface CheckoutData {
  order: CartItem[];
  customer: OrderFormData;
  totalPrice: string;
}
```
