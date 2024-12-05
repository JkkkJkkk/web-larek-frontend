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

### **Класс ProductModel**

Отвечает за бизнес-логику, связанную с товарами.

#### Поле класса:

- products: DisplayProduct[] — массив товаров.
- product: DisplayProduct | null — конкретный товар для отображения.

#### Методы:

- **getAll**  
  Возвращает список товаров для отображения.  
  **Пример:**  
  ```typescript
  const products = productModel.getAll();
  ```
  **Возвращает:** `DisplayProduct[]`

- **getById**  
  Возвращает данные конкретного товара для отображения.  
  **Пример:**  
  ```typescript
  const product = await productModel.getById("123");
  ```
  **Возвращает:** `DisplayProduct | undefined`

  - **setProducts**  
  Метод для записи товаров в модель. 
  **Пример:**  
  ```typescript
  productModel.setProducts(products);
  ```

  - **setProduct**  
  Метод для записи данных конкретного товара в модель.
  **Пример:**  
  ```typescript
  productModel.setProduct(product);
  ```

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

- **prepareOrderData**  
  Подготавливает данные для создания заказа.  
  **Пример:**  
  ```typescript
  const orderData = orderModel.prepareOrderData(cartItems);
  ```

- **setOrder**  
  Метод для записи данных о заказе в модель.
  **Пример:**  
  ```typescript
  orderModel.setOrder(orderData);
  ```

  - **getOrderData**  
  Возвращает текущие данные о заказе.
  **Пример:**  
  ```typescript
  const orderData = orderModel.getOrderData();
  ```

## **Компоненты представления**

### **Компонент ProductCard**

#### Свойства:

- **product**  - Данные товара для отображения.  **Тип:** `DisplayProduct`

#### Метрды:

- **renderCard()** - Отображает карточку товара на экране (название, изображение, цена и описание).
- **updateCard(product: DisplayProduct)** - Обновляет информацию о товаре в карточке.
- **setAddToCartHandler(handler: (productId: string) => void)** - станавливает обработчик для события добавления товара в корзину.

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

### **Класс OrderSummary**

Отвечает за отображение сводной информации о заказе.

#### Свойства:

- **order**  - Данные заказа.  **Тип:** `DisplayOrder`

#### Метрды:

- **renderSummary()** - Отображает сводную информацию о заказе (список товаров, общая сумма, статус).
- **updateSummary(order: DisplayOrder)** - Обновляет информацию о заказе на экране.

### **Класс OrderForm**

Отвечает за отображение формы оформления заказа.

#### Свойства:

- **formElement**  - DOM-элемент формы.  **Тип:** `HTMLFormElement`

#### Метрды:

- **renderForm()** - Рендерит форму заказа (поля для ввода имени, адреса, телефона и т.д.).
- **getFormData()** - Возвращает введенные данные для отправки на сервер. **Тип:** `OrderFormData`

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

### **OrderFormData**
```typescript
interface OrderFormData {
  name: string;
  address: string;
  phone: string;
  [key: string]: string;
}
```
