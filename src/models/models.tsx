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
	dataset: string;
	SKU: string;
}
