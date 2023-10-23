import { useBlockProps } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { PlayerData } from "../../types";

export default function Save({ attributes }: BlockSaveProps<PlayerData>) {
	const { name, age, position, tshirtSize, imgInfo } = attributes;
	return (
		<div {...useBlockProps.save()}>
			<h4>Player name: {name}</h4>
			<p>Player age: {age}</p>
			<p>Player position: {position}</p>
			<p>Tshirt size: {tshirtSize}</p>
			<img
				src={imgInfo?.url}
				alt={imgInfo?.alt}
				className={`wp-image-${imgInfo?.id}`}
				style={{ maxWidth: "500px", maxHeight: "500px" }}
			/>
		</div>
	);
}
