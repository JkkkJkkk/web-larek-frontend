import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

interface ISuccess {
	total: number;
}

interface SuccessActions {
	onClick: () => void;
}

export class Success extends Component<ISuccess> {
	private _totalElement: HTMLElement;
	private _closeButton: HTMLElement;

	constructor(container: HTMLElement, { onClick }: SuccessActions) {
		super(container);

		this._closeButton = this._getElement('.order-success__close');
		this._totalElement = this._getElement('.order-success__description');

		onClick && this._closeButton.addEventListener('click', onClick);
	}

	set total(value: string) {
		this._updateText(this._totalElement, `Списано ${value} синапсов`);
	}

	private _getElement(selector: string): HTMLElement {
		return ensureElement(selector, this.container) as HTMLElement;
	}

	private _updateText(element: HTMLElement, text: string): void {
		this.setText(element, text);
	}
}
