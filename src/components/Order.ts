import { Form } from './common/Form';
import { OrderFormData } from '../types';
import { Events } from './base/Events';
import { ensureAllElements } from '../utils/utils';

export class Order extends Form<OrderFormData> {
	private _buttons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: Events) {
		super(container, events);
		this._buttons = this._getButtons(container);
		this._initializePaymentButtons(events);
	}

	private _getButtons(container: HTMLFormElement): HTMLButtonElement[] {
		return ensureAllElements<HTMLButtonElement>('.button_alt', container);
	}

	private _initializePaymentButtons(events: Events): void {
		this._buttons.forEach((button) => {
			button.addEventListener('click', () =>
				this._onPaymentChange(button, events)
			);
		});
	}

	private _onPaymentChange(button: HTMLButtonElement, events: Events): void {
		this.payment = button.name;
		events.emit('payment:change', button);
	}

	set payment(name: string) {
		this._updatePaymentButtons(name);
	}

	private _updatePaymentButtons(name: string): void {
		this._buttons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}

	set address(value: string) {
		this._setInputValue('address', value);
	}

	private _setInputValue(name: string, value: string): void {
		const inputElement = this.container.elements.namedItem(
			name
		) as HTMLInputElement;
		if (inputElement) inputElement.value = value;
	}
}

export class Сontacts extends Form<OrderFormData> {
	constructor(container: HTMLFormElement, events: Events) {
		super(container, events);
	}

	set phone(value: string) {
		this._setInputValue('phone', value);
	}

	set email(value: string) {
		this._setInputValue('email', value);
	}

	private _setInputValue(name: string, value: string): void {
		const inputElement = this.container.elements.namedItem(
			name
		) as HTMLInputElement;
		if (inputElement) inputElement.value = value;
	}
}
