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

### EventEmitter

Класс для работы с событиями, обеспечивающий гибкую подписку, отписку, и обработку данных событий. Помимо стандартной функциональности, поддерживает подписку на все события или события, подходящие под заданный шаблон.

#### Методы:

- **on(eventName: EventName, callback: (event: T) => void): void**
  Подписывает на событие с заданным именем.  
  **Параметр:**
- `eventName`- Имя события для подписки.
- `callback`- Функция, выполняемая при возникновении события.

- **off(eventName: EventName, callback: Subscriber): void**
  Отписывает от события.

- **emit(eventName: string, data?: T): void**
  Инициирует событие с переданными данными.  
  **Параметр:**
- `data`- Данные, передаваемые обработчикам события.

- **onAll(callback: (event: EmitterEvent) => void): void**
  Подписывается на все события.

- **`offAll(): void**
  Снимает все обработчики событий.

- **trigger(eventName: string, context?: Partial<T>): void**
  Создает триггер для события с возможностью указания контекста.  
  **Параметр:**
- `context`- Контекст для события при инициации.

### Api

Класс для выполнения HTTP-запросов к API. Поддерживает базовые операции взаимодействия с сервером, включая отправку, обновление, получение и удаление данных.

#### Методы:

- **get(url: string): Promise<object>**
  Выполняет GET-запрос по указанному URI относительно `baseUrl`. Возвращает `Promise` с результатами ответа.

- **post(url: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>**
  Выполняет запрос с методами `POST`, `PUT` или `DELETE`.  
  **Параметры:**
- `url` (string): URI ресурса.
- `data` (object): Данные для отправки в теле запроса.
- `method` (ApiPostMethods): HTTP-метод (по умолчанию — `POST`).

- **handleResponse(response: Response): Promise<object>**
  Обрабатывает ответ от сервера. Возвращает `Promise` с результатом в формате JSON при успешном ответе или с ошибкой/статусом при неудаче.

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
  const product = productModel.getById('123');
  ```

## **Класс CartModel**

Реализует бизнес-логику для работы с корзиной.

### **Поля**

- `cartItems: CartItem[]` — список товаров в корзине.

### **Методы**

- **`addToCart(productId: string, quantity: number): void`**  
  Добавляет товар в корзину.

  ```typescript
  cartModel.addToCart('123', 2);
  ```

- **`removeFromCart(productId: string): void`**  
  Удаляет товар из корзины.

  ```typescript
  cartModel.removeFromCart('123');
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

<!-- ### **Компонент ProductCard** -->

Представление карточки товара, которое отображает информацию о товаре на экране.

#### Свойства:

- **products** — Данные товара для отображения. **Тип:** `DisplayProduct`

#### Методы:

- **set text** — установка содержимого описания

<!-- ### **Компонент Cart** -->

Представление корзины с товарами, где пользователь может управлять содержимым корзины.

#### Свойства:

- **title** — Разметки заголовка карточки.
- **category** — Разметки категории карточки.
- **image** — Разметки изображения карточки.
- **price** — Разметки цены товара.

#### Методы:

- **set title** — Установка содержимого заголовка.
- **set category** — Установка содержимого категории.
- **set image** — Устанавливает содержимое изображения.
- **set price** — Устанавливает содержимое цены.

<!-- ### **Компонент Order** -->

Представление для отображения заказа.

#### Свойства:

- **buttons** — Разметка кнопок формы оплаты

#### Методы:

- **set payment** — Устанавливает класс активности на кнопку.
- **set address** — Устанавливает значение поля адрес.

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

   - Представление, например, **ProductListView**, инициирует процесс загрузки данных через контроллер, вызывая метод, связанный с получением списка товаров.
   - Контроллер вызывает метод модели, например, **ProductModel.fetchProducts()**, который через **ApiClient.getProducts()** загружает данные с сервера.
   - Полученные данные сохраняются в модели через метод, например, **setProducts()**.
   - Модель уведомляет контроллер об обновлении данных, а контроллер инициирует обновление представления.
   - Представление рендерит данные, полученные от контроллера, на экране.

2. **Добавление товара в корзину**

   - Когда пользователь добавляет товар в корзину через компонент **ProductCard**, событие передается контроллеру, например, вызовом метода **addToCart(productId)**.
   - Контроллер делегирует это действие модели, например, **CartModel.addToCart(productId)**, где обновляется список товаров в корзине.
   - После обновления модели контроллер уведомляет представление, например, **CartView**, о необходимости обновления.
   - **CartView** получает обновленные данные через контроллер и рендерит их.

3. **Оформление заказа**

   - После того как товары добавлены в корзину, пользователь заполняет форму оформления заказа.
   - Данные формы передаются контроллеру, который вызывает метод модели, например, **OrderModel.setOrderData()**, для сохранения информации о заказе.
   - Контроллер инициирует валидацию данных и передачу заказа на сервер через **ApiClient.createOrder()**.
   - После успешного ответа сервера модель обновляет свое состояние (например, очищает корзину), а контроллер инициирует обновление представления.

4. **Обновление представления**
   - Модели данных используют механизм уведомлений (например, события или подписки), чтобы сообщить контроллеру об изменении данных.
   - Контроллер вызывает методы представлений, такие как **updateCartItems()** или **renderProductList()**, передавая обновленные данные для рендера.

## Взаимодействие с API

- **ApiClient** обрабатывает все запросы к серверу, включая получение и отправку данных.
- Методы, такие как **getProducts()**, **getProductById()** и **createOrder()**, используются исключительно моделью, а представления и контроллеры с ними напрямую не взаимодействуют.
- **Модели** (например, **ProductModel**, **CartModel**, **OrderModel**) используют API для загрузки данных, обновления состояния и передачи их контроллеру, который в свою очередь взаимодействует с представлением.

## Разграничение обязанностей

- **Представление** отвечает за отображение и передачу пользовательских действий контроллеру.
- **Контроллер** обрабатывает взаимодействия между представлением и моделью, связывая их.
- **Модель** управляет данными, используя API для их загрузки или сохранения, и уведомляет контроллер об изменениях.

## **Ключевые типы данных**

### **DisplayProduct**

```typescript
interface DisplayProduct {
	title: string;
	description: string;
	category: string;
	image: string;
	price: number | null;
	id: string;
}
```

### **ProductList**

```typescript
interface ProductsList {
	products: DisplayProduct[];
}
```

### **OrderFormData**

```typescript
interface OrderFormData {
	payment?: string;
	address?: string;
	email?: string;
	phone?: string;
	total?: string | number;
}
```

### **Order**

```typescript
interface Order extends OrderFormData {
	items: string[];
}
```

### **AppState**

```typescript
interface AppState {
	loading: boolean;
	catalog: DisplayProduct[];
	preview: string;
	order: Order;
	basket: string[];
	total: string | number;
}
```

### **OrderResult**

```typescript
interface OrderResult {
	id: string;
}
```

### **FormState**

```typescript
interface FormState {
	valid: boolean;
	errors: string[];
}
```

### **ModalData**

```typescript
interface ModalData {
	content: HTMLElement;
}
```

### **IBasket**

```typescript
interface IBasket {
	items: HTMLElement[];
	totalAmount: number;
}
```

### **ICard**

```typescript
interface ICard {
	id: string;
	description: string;
	selected: boolean;
	title: string;
	category: string;
	image: string;
	price: number;
	text: string;
}
```

### **ICardBasket**

```typescript
interface ICardBasket {
	title: string;
	price: number;
	index: number;
}
```

### **ICardPreview**

```typescript
interface ICardPreview {
	text: string;
}
```

### **IPage**

```typescript
interface IPage {
	catalog: HTMLElement[];
}
```

### **ISuccess**

```typescript
interface ISuccess {
	total: number;
}
```

### **CategoryClassNames**

```typescript
interface CategoryClassNames {
	[categoryName: string]: string;
}
```
