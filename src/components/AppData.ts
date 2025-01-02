import {
	AppState,
	DisplayProduct,
	Order,
	OrderFormData,
	FormErrors,
} from '../types';
import { Model } from '../components/base/Model';

export class AppData extends Model<AppState> {
	preview: string;
	catalog: Product[] = [];
	order: Order = {
		address: '',
		email: '',
		phone: '',
		payment: 'card',
		items: [],
		total: 0,
	};
	basket: Product[] = [];
	formErrors: FormErrors = {};

	clearBasket() {
		this.basket = [];
		this.order.items = [];
	}

	addToBasket(product: Product) {
		this.basket.push(product);
	}

	removeFromBasket(product: Product) {
		this.basket = this.basket.filter((item) => item.id !== product.id);
	}

	getCountProductInBasket() {
		return this.basket.length;
	}

	addToOrder(product: Product) {
		this.order.items.push(product.id);
	}

	removeFromOrder(product: Product) {
		this.order.items = this.order.items.filter(
			(itemId) => itemId !== product.id
		);
	}

	setCatalog(items: DisplayProduct[]) {
		this.catalog = items.map((item) => new Product(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: Product) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	setProductToBasket(item: Product) {
		this.addToBasket(item);
	}

	removeProductFromBasket(item: Product) {
		this.removeFromBasket(item);
	}

	get statusBasket(): boolean {
		return this.basket.length === 0;
	}

	get bskt(): Product[] {
		return this.basket;
	}

	set total(value: number) {
		this.order.total = value;
	}

	getTotal() {
		return this.order.items.reduce((total, itemId) => {
			const product = this.catalog.find((it) => it.id === itemId);
			return product ? total + (product.price || 0) : total;
		}, 0);
	}

	setOrderField(field: keyof OrderFormData, value: string) {
		this.order[field] = value;
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setContactField(field: keyof OrderFormData, value: string) {
		this.order[field] = value;
		if (this.validateContact()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContact() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}

export class Product extends Model<DisplayProduct> {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	price: number | null;
	selected: boolean;

	constructor(item: DisplayProduct, events: any) {
		super(item, events);
		this.id = item.id;
		this.title = item.title;
		this.description = item.description;
		this.category = item.category;
		this.image = item.image;
		this.price = item.price;
		this.selected = false;
	}
}
