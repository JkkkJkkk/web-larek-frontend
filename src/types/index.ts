export interface DisplayProduct {
	title: string;
	description: string;
	category: string;
	image: string;
	price: number | null;
	id: string;
}

export interface ProductsList {
	products: DisplayProduct[];
}

export interface OrderFormData {
	payment?: string;
	address?: string;
	email?: string;
	phone?: string;
	total?: string | number;
}

export interface Order extends OrderFormData {
	items: string[];
}

export interface AppState {
	loading: boolean;
	catalog: DisplayProduct[];
	preview: string;
	order: Order;
	basket: string[];
	total: string | number;
}

export type FormErrors = Partial<Record<keyof Order, string>>;

export interface OrderResult {
	id: string;
}
