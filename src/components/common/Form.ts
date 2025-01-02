import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { Events } from '../base/Events';

interface FormState {
	valid: boolean;
	errors: string[];
}

export class Form<T> extends Component<FormState> {
	private submitButton: HTMLButtonElement;
	private errorsContainer: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: Events) {
		super(container);

		this.submitButton = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this.errorsContainer = ensureElement<HTMLElement>(
			'.form__errors',
			this.container
		);

		this.setupEventListeners();
	}

	private setupEventListeners(): void {
		this.container.addEventListener('input', this.handleInputChange);
		this.container.addEventListener('submit', this.handleSubmit);
	}

	private handleInputChange = (e: Event): void => {
		const target = e.target as HTMLInputElement;
		const field = target.name as keyof T;
		this.emitFieldChange(field, target.value);
	};

	private handleSubmit = (e: Event): void => {
		e.preventDefault();
		this.events.emit(`${this.container.name}:submit`);
	};

	private emitFieldChange(field: keyof T, value: string): void {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this.toggleSubmitButton(value);
	}

	private toggleSubmitButton(isEnabled: boolean): void {
		this.setDisabled(this.submitButton, !isEnabled);
	}

	set errors(value: string | string[]) {
		if (Array.isArray(value)) {
			this.setText(this.errorsContainer, value.join(', '));
		} else {
			this.setText(this.errorsContainer, value);
		}
	}

	private clearErrors(): void {
		this.setText(this.errorsContainer, '');
	}

	render(state: Partial<T> & FormState): HTMLElement {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });

		if (errors && errors.length) {
			this.errors = errors;
		} else {
			this.clearErrors();
		}

		Object.assign(this, inputs);

		return this.container;
	}

	private resetForm(): void {
		this.clearErrors();
		this.container.reset();
		this.toggleSubmitButton(false);
	}

	public validate(): boolean {
		let valid = true;
		const errors: string[] = [];
		this.errors = errors;
		this.valid = valid;

		return valid;
	}
}
