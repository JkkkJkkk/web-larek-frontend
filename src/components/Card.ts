import { settings } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

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

interface CardActions {
	onClick: (event: MouseEvent) => void;
}

class BaseCard<T> extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;

	protected _categoryColorMap: Record<string, string> = {
		'софт-скил': 'soft',
		другое: 'other',
		дополнительное: 'additional',
		кнопка: 'button',
		'хард-скил': 'hard',
	};

	constructor(container: HTMLElement, actions?: CardActions) {
		super(container);
		this._title = ensureElement('.card__title', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container); // Обновлено
		this._category = ensureElement('.card__category', container);
		this._price = ensureElement('.card__price', container);
		this._button = container.querySelector('.card__button');

		if (actions?.onClick) {
			this._setUpClickListener(actions.onClick, container);
		}
	}

	private _setUpClickListener(
		onClick: (event: MouseEvent) => void,
		container: HTMLElement
	): void {
		if (this._button) {
			this._button.addEventListener('click', onClick);
		} else {
			container.addEventListener('click', onClick);
		}
	}

	protected _updateButtonState(value: number | null): void {
		if (value === null) {
			this.setDisabled(this._button, true);
			this.setText(this._button, 'Нельзя купить');
		}
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
		this._updateButtonState(value);
	}

	get price(): number {
		return +this._price.textContent || 0;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this.toggleClass(this._category, 'card__category_soft', false);
		this.toggleClass(this._category, settings.categoryClassNames[value], true);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set button(value: string) {
		if (this._price.textContent === 'Бесценно') {
			this.setDisabled(this._button, true);
			this.setText(this._button, 'Нельзя купить');
		} else {
			this.setText(this._button, value);
		}
	}

	updatePrice(selected: boolean) {
		this.setText(this._button, selected ? 'Убрать из корзины' : 'В корзину');
	}
}

export class Card extends BaseCard<ICard> {}

interface ICardPreview {
	text: string;
}

export class CardPreview extends BaseCard<ICardPreview> {
	protected _text: HTMLElement;

	constructor(container: HTMLElement, act?: CardActions) {
		super(container, act);
		this._text = ensureElement('.card__text', container);
	}

	set text(value: string) {
		this.setText(this._text, value);
	}
}

interface ICardBasket {
	title: string;
	price: number;
	index: number;
}

export class CardBasket extends Component<ICardBasket> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement;
	protected _index: HTMLElement;

	constructor(container: HTMLElement, act?: CardActions) {
		super(container);
		this._title = ensureElement('.card__title', container);
		this._price = ensureElement('.card__price', container);
		this._index = ensureElement('.basket__item-index', container);
		this._button = container.querySelector('.card__button');

		if (act?.onClick) {
			this._setUpClickListener(act.onClick, container);
		}
	}

	private _setUpClickListener(
		onClick: (event: MouseEvent) => void,
		container: HTMLElement
	): void {
		if (this._button) {
			this._button.addEventListener('click', onClick);
		}
	}

	set index(value: number) {
		this.setText(this._index, value);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: string) {
		this.setText(
			this._price,
			value === null ? 'Бесценно' : `${value} синапсов`
		);
	}
}
