import './scss/styles.scss';
import { Basket } from './components/Basket';
import { Modal } from './components/common/Modal';
import { Success } from './components/Success';
import { EventEmitter } from './components/base/events';
import { ApiLarek } from './components/Api';
import { AppData, Product } from './components/AppData';
import { Card, CardBasket, CardPreview } from './components/Card';
import { Page } from './components/Page';
import { Order, Сontacts } from './components/Order';
import { OrderFormData } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const api = new ApiLarek(CDN_URL, API_URL);
const eventEmitter = new EventEmitter();

eventEmitter.onAll(({ eventName, data }) => console.log(eventName, data));

const appData = new AppData({}, eventEmitter);

const page = new Page(document.body, eventEmitter);
const modal = new Modal(
	ensureElement<HTMLElement>('#modal-container'),
	eventEmitter
);

const templates = {
	success: ensureElement<HTMLTemplateElement>('#success'),
	cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
	cardCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
	cardBasket: ensureElement<HTMLTemplateElement>('#card-basket'),
	order: ensureElement<HTMLTemplateElement>('#order'),
	basket: ensureElement<HTMLTemplateElement>('#basket'),
	contacts: ensureElement<HTMLTemplateElement>('#contacts'),
};

const basket = new Basket(cloneTemplate(templates.basket), eventEmitter);
const order = new Order(cloneTemplate(templates.order), eventEmitter);
const contacts = new Сontacts(cloneTemplate(templates.contacts), eventEmitter);

eventEmitter.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) =>
		new Card(cloneTemplate(templates.cardCatalog), {
			onClick: () => eventEmitter.emit('card:select', item),
		}).render({
			title: item.title,
			category: item.category,
			image: api.cdn + item.image,
			price: item.price,
		})
	);
});

eventEmitter.on('card:select', (item: Product) => {
	page.locked = true;
	const productPreview = new CardPreview(cloneTemplate(templates.cardPreview), {
		onClick: () => {
			item.selected
				? eventEmitter.emit('basket:removeFromBasket', item)
				: eventEmitter.emit('card:addToBasket', item);
			modal.close();
			productPreview.updatePrice(item.selected);
		},
	});
	productPreview.updatePrice(item.selected);
	modal.render({
		content: productPreview.render({
			id: item.id,
			title: item.title,
			image: api.cdn + item.image,
			category: item.category,
			description: item.description,
			price: item.price,
			selected: item.selected,
		}),
	});
});

eventEmitter.on('card:addToBasket', (item: Product) => {
	appData.addToOrder(item);
	item.selected = true;
	appData.setProductToBasket(item);
	page.counter = appData.bskt.length;
	modal.close();
});

eventEmitter.on('basket:removeFromBasket', (item: Product) => {
	appData.removeProductFromBasket(item);
	item.selected = false;
	appData.removeFromOrder(item);
	page.counter = appData.bskt.length;
	basket.setDisabled(basket.button, appData.statusBasket);
	basket.totalAmount = appData.getTotal();
	let index = 1;
	basket.items = appData.bskt.map((item) =>
		new CardBasket(cloneTemplate(templates.cardBasket), {
			onClick: () => eventEmitter.emit('basket:removeFromBasket', item),
		}).render({
			title: item.title,
			price: item.price,
			index: index++,
		})
	);
	modal.render({ content: basket.render() });
});

eventEmitter.on('preview:changed', (item: Product) => {
	const previewCard = new CardPreview(cloneTemplate(templates.cardPreview), {
		onClick: () => eventEmitter.emit('card:add', item),
	});
	modal.render({
		content: previewCard.render({
			title: item.title,
			text: item.description,
			category: item.category,
			image: api.cdn + item.image,
			price: item.price,
		}),
	});
});

eventEmitter.on('basket:open', () => {
	basket.setDisabled(basket.button, appData.statusBasket);
	basket.totalAmount = appData.getTotal();
	let index = 1;
	basket.items = appData.bskt.map((item) =>
		new CardBasket(cloneTemplate(templates.cardBasket), {
			onClick: () => eventEmitter.emit('basket:removeFromBasket', item),
		}).render({
			title: item.title,
			price: item.price,
			index: index++,
		})
	);
	modal.render({ content: basket.render() });
});

eventEmitter.on(
	/^contacts\..*:change/,
	(data: { field: keyof OrderFormData; value: string }) => {
		appData.setContactField(data.field, data.value);
	}
);

eventEmitter.on(
	/^order\..*:change/,
	(data: { field: keyof OrderFormData; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

eventEmitter.on('payment:change', (item: HTMLButtonElement) => {
	appData.order.payment = item.name;
});

eventEmitter.on('formErrors:change', (errors: Partial<OrderFormData>) => {
	const { phone, email, payment, address } = errors;
	contacts.valid = !email && !phone;
	order.valid = !address && !payment;
	order.errors = Object.values({ address, payment }).filter(Boolean).join('; ');
	contacts.errors = Object.values({ phone, email }).filter(Boolean).join('; ');
});

eventEmitter.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			payment: 'card',
			valid: false,
			errors: [],
		}),
	});
});

eventEmitter.on('order:submit', () => {
	appData.order.total = appData.getTotal();
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

eventEmitter.on('modal:open', () => (page.locked = true));
eventEmitter.on('modal:close', () => (page.locked = false));

eventEmitter.on('contacts:submit', () => {
	api
		.orderProducts(appData.order)
		.then(() => {
			const success = new Success(cloneTemplate(templates.success), {
				onClick: () => {
					modal.close();
					appData.clearBasket();
					page.counter = appData.bskt.length;
				},
			});
			modal.render({
				content: success.render({ total: appData.getTotal() }),
			});
		})
		.catch(console.error);
});

api
	.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch(console.error);
