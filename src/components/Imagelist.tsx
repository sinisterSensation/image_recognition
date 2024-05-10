import React, { useState, useEffect } from "react";
import { Images } from "../models/models";
import ImageStore from "../store/ImageStore";
import { ReactComponent as Accept } from "../icons/accept.svg";
import { ReactComponent as Danger } from "../icons/danger.svg";
import { ReactComponent as Question } from "../icons/question.svg";
import { ReactComponent as Cross } from "../icons/cross.svg";

const Imagelist = ({
	selectedDataset,
	selectedSKU,
	updateImageResult,
	switchChecked,
}: {
	selectedDataset: string;
	selectedSKU: string;
	updateImageResult: (updatedImages: Images[]) => void;
	switchChecked: boolean;
}) => {
	const [selectedImage, setSelectedImage] = useState<Images | null>(null);

	const filteredImages = ImageStore.images.filter(
		(image) => image.dataset === selectedDataset && image.SKU === selectedSKU
	);

	const wideImages = filteredImages.filter(
		(image) => image.image_info.width > 320 && image.image_info.width / image.image_info.height >= 16 / 9
	);

	const narrowImages = filteredImages.filter(
		(image) =>
			image.image_info.width <= 320 ||
			(image.image_info.width / image.image_info.height < 16 / 9 &&
				image.image_info.width / image.image_info.height >= 4 / 3)
	);

	const handleClick = (image: Images) => {
		setSelectedImage(image);
	};

	const handleCross = () => {
		const updatedImages = ImageStore.images.map((image) =>
			image.id === selectedImage?.id ? { ...image, image_result: { ...image.image_result, bad: true } } : image
		);
		setSelectedImage(null);
		updateImageResult(updatedImages);
	};

	const handleQuestion = () => {
		const updatedImages = ImageStore.images.map((image) =>
			image.id === selectedImage?.id
				? { ...image, image_result: { ...image.image_result, unknown_SKU: true } }
				: image
		);
		setSelectedImage(null);
		updateImageResult(updatedImages);
	};

	const handleDanger = () => {
		const updatedImages = ImageStore.images.map((image) =>
			image.id === selectedImage?.id
				? { ...image, image_result: { ...image.image_result, mistake: true } }
				: image
		);
		setSelectedImage(null);
		updateImageResult(updatedImages);
	};

	const handleAccept = () => {
		const updatedImages = ImageStore.images.map((image) =>
			image.id === selectedImage?.id
				? { ...image, image_result: { ...image.image_result, correct: true } }
				: image
		);
		setSelectedImage(null);
		updateImageResult(updatedImages);
	};

	useEffect(() => {
		ImageStore.updateImageResultCallback(ImageStore.updateImageResult);
	}, []);

	const renderImages = (images: Images[], imageType: string) => {
		let rowLimit = imageType === "wide" ? 3 : 4;
		let maxWidth = imageType === "wide" ? 320 : 240;

		const rows: JSX.Element[] = [];
		let currentRow: JSX.Element[] = [];

		images.forEach((image, index) => {
			currentRow.push(
			  <div key={image.id} className="img_in_list_block">
				<img
				  className={`img_in_list ${selectedImage === image ? "selected" : ""}`}
				  src={image.path}
				  alt={`${image.dataset} - ${image.SKU}`}
				  style={{
					width: `${100 / rowLimit}%`,
					maxHeight: "240px",
					maxWidth: `${maxWidth}px`,
					filter: switchChecked ? "blur(4px)" : "none", 
				  }}
				  onClick={() => handleClick(image)}
				/>
				{selectedImage === image && (
				  <div className="selected_image_details">
							<div className="img_btn_block">
								<button className="img_btn" onClick={handleCross}>
									<Cross className="cross_img" />
								</button>
								<div className="verticle_line"></div>
								<button className="img_btn" onClick={handleQuestion}>
									<Question />
								</button>
								<div className="verticle_line"></div>
								<button className="img_btn" onClick={handleDanger}>
									<Danger />
								</button>
								<div className="verticle_line"></div>
								<button className="img_btn" onClick={handleAccept}>
									<Accept className="accept_img" />
								</button>
							</div>
						</div>
					)}
				</div>
			);

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
