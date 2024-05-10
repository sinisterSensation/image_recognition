import React, { useState, useEffect } from "react";
import { Images } from "../models/models";
import ImageStore from "../store/ImageStore";
import { ReactComponent as Logo } from "../icons/logo.svg";
import Imagelist from "./Imagelist";

const Navbar: React.FC<{ switchChecked: boolean }> = ({ switchChecked }) => {
	const [menuItems, setMenuItems] = useState<{ name: string; dataset: string; SKU: string }[]>([]);
	const [selectedItem, setSelectedItem] = useState<{ dataset: string; SKU: string }>({ dataset: "", SKU: "" });

	useEffect(() => {
		const data = ImageStore.images.reduce((acc, image: Images) => {
			if (!acc[image.dataset + " / " + image.SKU]) {
				acc[image.dataset + " / " + image.SKU] = {
					count: 0,
					total: 0,
				};
			}
			acc[image.dataset + " / " + image.SKU].total++;

			if (image.confidence) {
				acc[image.dataset + " / " + image.SKU].count++;
			}

			return acc;
		}, {} as { [key: string]: { count: number; total: number } });

		const menuItemsData = Object.keys(data).map((key) => {
			return {
				name: `${key} (${data[key].count} / ${data[key].total})`,
				dataset: key.split("/")[0].trim(),
				SKU: key.split("/")[1].trim(),
			};
		});

		setMenuItems(menuItemsData);
	}, []);

	const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const [selectedDataset, selectedSKU] = event.target.value.split("/").map((item) => item.trim());
		setSelectedItem({ dataset: selectedDataset, SKU: selectedSKU });
	};

	return (
		<div>
			<nav className="navbar">
				<Logo className="nav_logo" />
				<div className="dropdown_menu">
					<select
						className="dropdown"
						onChange={handleDropdownChange}
						value={selectedItem.dataset === "" ? "" : `${selectedItem.dataset} / ${selectedItem.SKU}`}
					>
						<option className="dropdown_option" value="" disabled hidden>
							Выберите SKU из датасета...
						</option>
						{menuItems.map((menuItem, index) => (
							<option
								className="dropdown_option"
								key={index}
								value={`${menuItem.dataset} / ${menuItem.SKU}`}
							>
								{menuItem.name}
							</option>
						))}
					</select>
				</div>
			</nav>
			<Imagelist
				selectedDataset={selectedItem.dataset}
				selectedSKU={selectedItem.SKU}
				updateImageResult={ImageStore.updateImageResult}
				switchChecked={switchChecked}
			/>
		</div>
	);
};

export default Navbar;
