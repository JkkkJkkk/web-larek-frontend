import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { Events } from './base/events';

interface IPage {
	catalog: HTMLElement[];
}

export class Page extends Component<IPage> {
	private _elements: { [key: string]: HTMLElement } = {};

	constructor(container: HTMLElement, protected event: Events) {
		super(container);

		this._elements = this._initializeElements({
			catalog: '.gallery',
			counter: '.header__basket-counter',
			basket: '.header__basket',
			wrapper: '.page__wrapper',
		});

		this._addBasketClickListener();
	}

	set counter(value: number) {
		this.setText(this._elements.counter, String(value));
	}

	set catalog(items: HTMLElement[]) {
		this._elements.catalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		this.toggleClass(this._elements.wrapper, 'page__wrapper_locked', value);
	}

	private _initializeElements(selectors: { [key: string]: string }): {
		[key: string]: HTMLElement;
	} {
		return Object.keys(selectors).reduce((acc, key) => {
			acc[key] = ensureElement<HTMLElement>(selectors[key], this.container);
			return acc;
		}, {} as { [key: string]: HTMLElement });
	}

	private _addBasketClickListener() {
		this._elements.basket.addEventListener('click', this._onBasketClick);
	}

	private _onBasketClick = () => {
		this.event.emit('basket:open');
	};
}
