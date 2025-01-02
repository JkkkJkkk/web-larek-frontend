export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	toggleClass(element: HTMLElement, className: string, force?: boolean): void {
		if (element) {
			element.classList.toggle(className, force ?? false);
		}
	}

	setDisabled(element: HTMLElement, state: boolean): void {
		if (element) {
			state
				? element.setAttribute('disabled', 'disabled')
				: element.removeAttribute('disabled');
		}
	}

	protected setText(element: HTMLElement, value: unknown): void {
		if (element) {
			element.textContent = String(value);
		}
	}

	protected setImage(
		element: HTMLImageElement,
		src: string,
		alt?: string
	): void {
		if (element) {
			element.src = src;
			if (alt) element.alt = alt;
		}
	}

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
