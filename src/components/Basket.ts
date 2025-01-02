import { createElement, ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { EventEmitter } from './base/Events';

interface IBasket {
	items: HTMLElement[];
	totalAmount: number;
}

export class Basket extends Component<IBasket> {
	private itemList: HTMLElement;
	private totalAmountElem: HTMLElement;
	private actionButton: HTMLElement;

	constructor(container: HTMLElement, private eventEmitter: EventEmitter) {
		super(container);

		this.itemList = ensureElement('.basket__list', this.container);
		this.totalAmountElem = ensureElement('.basket__price', this.container);
		this.actionButton = ensureElement('.basket__button', this.container);

		this.actionButton.addEventListener(
			'click',
			this.handleButtonClick.bind(this)
		);

		this.items = [];
	}

	private handleButtonClick() {
		this.eventEmitter.emit('order:open');
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.updateItemsList(items);
		} else {
			this.displayEmptyBasket();
		}
	}

	private updateItemsList(items: HTMLElement[]) {
		this.itemList.replaceChildren(...items);
	}

	private displayEmptyBasket() {
		const emptyMessage = createElement<HTMLParagraphElement>('p', {
			textContent: 'Корзина пуста',
		});
		this.itemList.replaceChildren(emptyMessage);
	}

	set totalAmount(amount: number) {
		this.setText(this.totalAmountElem, `${amount} синапсов`);
	}

	get totalAmount() {
		const totalText = this.totalAmountElem.textContent || '0';
		return parseInt(totalText, 10) || 0;
	}

	get button() {
		return this.actionButton;
	}
}
