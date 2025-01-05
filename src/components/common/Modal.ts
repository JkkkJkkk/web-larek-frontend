import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { Events } from '../base/events';

interface ModalData {
	content: HTMLElement;
}

export class Modal extends Component<ModalData> {
	private closeButton: HTMLButtonElement;
	private contentElement: HTMLElement;

	constructor(container: HTMLElement, protected events: Events) {
		super(container);
		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this.contentElement = ensureElement<HTMLElement>(
			'.modal__content',
			container
		);
		this.setupEventListeners();
	}

	private setupEventListeners(): void {
		this.closeButton.addEventListener('click', this.close);
		this.container.addEventListener('click', this.close);
		this.contentElement.addEventListener('click', (event) =>
			event.stopPropagation()
		);
	}

	set content(value: HTMLElement | null) {
		if (value) {
			this.contentElement.replaceChildren(value);
		} else {
			this.contentElement.innerHTML = '';
		}
	}

	open(): void {
		this.toggleClass(this.container, 'modal_active', true);
		this.events.emit('modal:open');
	}

	close = (): void => {
		this.toggleClass(this.container, 'modal_active', false);
		this.content = null;
		this.events.emit('modal:close');
	};

	render(data: ModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}

	updateContent(newContent: HTMLElement): void {
		this.content = newContent;
	}
}
