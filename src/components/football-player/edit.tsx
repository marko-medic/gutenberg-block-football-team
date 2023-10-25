import { useBlockProps } from "@wordpress/block-editor";
import { BlockEditProps } from "@wordpress/blocks";
import { Button } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { ImgInfo, PlayerData, TShirtData } from "../../types";
import ImageUploader from "../image-uploader";
import { dispatch, useSelect } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";
import { store as tshirtStore } from "../../store/const";

export default function Edit({
	attributes,
	setAttributes,
}: BlockEditProps<PlayerData>) {
	const [state, setState] = useState<PlayerData>({
		name: attributes.name || "",
		age: attributes.age || 0,
		position: attributes.position || "",
		tshirtSize: attributes.tshirtSize || "",
		imgInfo: attributes.imgInfo?.id
			? attributes.imgInfo
			: {
					url: "",
					alt: "",
					id: "",
			  },
	});

	const { positionFieldVisible } = attributes;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// validation...
		setAttributes(state);
		dispatch(noticesStore).createNotice("success", "Form submitted");
	};

	const handleSetPlayerState = (
		attr: keyof PlayerData,
		value: string | PlayerData["imgInfo"],
	) => {
		setState({
			...state,
			[attr]: value,
		});
	};

	const tshirtSizes = useSelect((select: any) => {
		return (select(tshirtStore).getTshirts() || []).filter(
			(tshirt: TShirtData) => tshirt.selected,
		);
	}, []);

	const renderAvailableSizes = () => {
		return tshirtSizes.map((tshirt: TShirtData) => (
			<option key={tshirt.size} value={tshirt.size}>
				{tshirt.size}
			</option>
		));
	};

	return (
		<div {...useBlockProps()}>
			<h4>Player info:</h4>
			<form onSubmit={handleSubmit} style={{ maxWidth: "60%" }}>
				<input
					placeholder="Name"
					type="text"
					value={state.name}
					onChange={(e) => handleSetPlayerState("name", e.target.value)}
				/>
				<br />
				<input
					placeholder="Age"
					type="text"
					value={state.age || ""}
					onChange={(e) => handleSetPlayerState("age", e.target.value)}
				/>
				<br />
				{positionFieldVisible && (
					<input
						placeholder="Position"
						type="text"
						value={state.position}
						onChange={(e) => handleSetPlayerState("position", e.target.value)}
					/>
				)}
				<br />
				<select
					name="tshirtSize"
					onChange={(e) => handleSetPlayerState("tshirtSize", e.target.value)}
				>
					Select tshirt size: {renderAvailableSizes()}
				</select>
				<br />
				<ImageUploader
					imgInfo={state.imgInfo}
					onDataChange={(data: ImgInfo) => {
						handleSetPlayerState("imgInfo", data);
					}}
				/>
				<br />
				<Button variant="primary" type="submit">
					Save the player
				</Button>
			</form>
		</div>
	);
}
