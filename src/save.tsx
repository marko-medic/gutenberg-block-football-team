import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { ImgInfo, PlayerData } from "./types";

interface Props {
	teamData: PlayerData[];
	imgInfo: ImgInfo;
}

export default function save({ attributes }: BlockSaveProps<Props>) {
	const { teamData, imgInfo } = attributes;
	const blockProps = useBlockProps.save();

	const innerProps = useInnerBlocksProps.save({
		...blockProps,
		style: {
			backgroundColor: "lightgreen",
		},
	});
	if (!teamData) {
		return null;
	}
	return (
		<div {...blockProps}>
			{teamData.map((player) => (
				<div
					key={player.name}
					style={{
						marginBottom: "0.5rem",
						border: "2px dotted red",
					}}
				>
					<p>Name: {player.name}</p>
					<p>Age: {player.age}</p>
					<p>Position: {player.position}</p>
					<p>Tshirt Size: {player.tshirtSize || "Not set"}</p>
				</div>
			))}
			<img
				alt={imgInfo?.alt}
				src={imgInfo?.url}
				className={`wp-image-${imgInfo?.id}`}
			/>
			<section {...innerProps} />
		</div>
	);
}
