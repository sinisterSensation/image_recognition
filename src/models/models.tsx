export interface Images {
	id: number;
	path: string;
	confidence: boolean;
	image_info: {
		width: number;
		height: number;
		blur: boolean;
		motion_blur: boolean;
	};
	image_result: {
		bad: boolean;
		unknown_SKU: boolean;
		mistake: boolean;
		correct: boolean;
	};
	dataset: string;
	SKU: string;
}
