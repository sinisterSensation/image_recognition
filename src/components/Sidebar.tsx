import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Sidebar = () => {
	const [imageSize, setImageSize] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(0);
	const [switchChecked, setSwitchChecked] = useState<any>(false);

	const handleImageSizeChange = (event: Event, newValue: number | number[]) => {
		setImageSize(newValue as number);
	};

	const handlePageSizeChange = (event: Event, newValue: number | number[]) => {
		setPageSize(newValue as number);
	};

	const handleSwitchChange = () => {
		setSwitchChecked((switchChecked: any) => true);
	};

	return (
		<div className="sidebar">
			<div className="tool_container">
				<div className="tool_name">Размытие:</div>
				<Switch
					className="tool"
					color="default"
					checked={switchChecked}
					onChange={handleSwitchChange}
					sx={{
						"& .MuiSwitch-thumb": {
							backgroundColor: switchChecked ? "var(--success)" : "var(--dark)",
						},
						"& .MuiSwitch-track": {
							backgroundColor: switchChecked ? "var(--success)" : "var(--dark)",
						},
					}}
				/>
				<hr className="divider" />
			</div>
			<div className="tool_container">
				<div className="tool_name">Размер изображения:</div>
				<Box className="tool" sx={{ width: 200 }}>
					<Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
						<Slider
							valueLabelDisplay="auto"
							step={10}
							min={20}
							max={200}
							aria-label="Image Size"
							value={imageSize}
							onChange={handleImageSizeChange}
							style={{ color: "var(--dark)" }}
							sx={{
								"& .Mui-focusVisible": {
									boxShadow: "0px 0px 0px 6px rgba(0,0,0,0.2) !important",
								},

								"& .MuiSlider-thumb:hover": {
									boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)",
								},
							}}
						/>
					</Stack>
				</Box>
				<hr className="divider" />
			</div>
			<div className="tool_container">
				<div className="tool_name">Размер страницы:</div>
				<Box className="tool" sx={{ width: 200 }}>
					<Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
						<Slider
							valueLabelDisplay="auto"
							step={10}
							min={10}
							max={200}
							aria-label="Page Size"
							value={pageSize}
							onChange={handlePageSizeChange}
							style={{ color: "var(--dark)" }}
							sx={{
								"& .Mui-focusVisible": {
									boxShadow: "0px 0px 0px 6px rgba(0,0,0,0.2) !important",
								},

								"& .MuiSlider-thumb:hover": {
									boxShadow: "0px 0px 0px 8px rgba(0,0,0,0.2)",
								},
							}}
						/>
					</Stack>
				</Box>
				<hr className="divider" />
			</div>
			<div className="tool_container">
				<div className="tool_name">Пометить оставшиеся как корректные:</div>
				<Stack className="tool" spacing={2} direction="row" alignItems="center">
					<Button
						variant="contained"
						style={{
							backgroundColor: "var(--success)",
							color: "white",
						}}
					>
						Сохранить
					</Button>
				</Stack>
			</div>
		</div>
	);
};

export default Sidebar;
