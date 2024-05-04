import React from "react";
import { Images } from "../models/models";
import ImageStore from "../store/ImageStore";

const Imagelist = ({ selectedDataset, selectedSKU }: { selectedDataset: string; selectedSKU: string }) => {
	const filteredImages = ImageStore.images.filter(
		(image: Images) => image.dataset === selectedDataset && image.SKU === selectedSKU
	);

	const wideImages = filteredImages.filter(
		(image: Images) => image.image_info.width > 320 && image.image_info.width / image.image_info.height >= 16 / 9
	);
	const narrowImages = filteredImages.filter(
		(image: Images) =>
			image.image_info.width <= 320 ||
			(image.image_info.width / image.image_info.height < 16 / 9 &&
				image.image_info.width / image.image_info.height >= 4 / 3)
	);

	const renderImages = (images: Images[], imageType: string) => {
		let rowLimit = imageType === "wide" ? 3 : 4;
		let maxWidth = imageType === "wide" ? 395 : 265;

		const rows: JSX.Element[] = [];
		let currentRow: JSX.Element[] = [];

		images.forEach((image: Images, index: number) => {
			if (currentRow.length < rowLimit) {
				currentRow.push(
					<>
						<img
							className="img_in_list"
							key={image.id}
							src={image.path}
							alt={`${image.dataset} - ${image.SKU}`}
							style={{
								width: `${100 / rowLimit}%`,
								maxHeight: "320px",
								maxWidth: `${maxWidth}px`,
							}}
						/>
					</>
				);
			}

			if (currentRow.length === rowLimit || index === images.length - 1) {
				rows.push(
					<div key={index} style={{ display: "flex" }}>
						{currentRow}
					</div>
				);
				currentRow = [];
			}
		});

		return rows;
	};

	return (
		<div className="imagelist">
			{renderImages(wideImages, "wide")}
			{renderImages(narrowImages, "narrow")}
		</div>
	);
};

export default Imagelist;
