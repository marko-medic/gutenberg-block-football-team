import {
	AlignmentToolbar,
	BlockControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { PlayerData } from "../types";
import { useState } from "@wordpress/element";
import { BLOCK_ALIAS } from "../const";
import { useTeamContext } from "../context";

interface Props {
	teamData: PlayerData[];
}

function FootballMembers({ teamData }: Props) {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["custom-block/football-player"],
	});
	const { attributes } = useTeamContext();
	const { imgInfo } = attributes;
	const [alignValue, setAlignValue] = useState("left");
	const [shadow, setShadow] = useState(false);
	const [richTextContent, setRichTextContent] = useState("");

	const toggleShadow = () => {
		setShadow(!shadow);
	};

	return (
		<>
			<h3>{BLOCK_ALIAS}</h3>

			<BlockControls
				controls={[
					{
						icon: "admin-page",
						title: "Shadow",
						onClick: toggleShadow,
						isActive: shadow,
					},
				]}
			>
				<AlignmentToolbar
					value={alignValue}
					onChange={(val) => setAlignValue(val || "left")}
				/>
			</BlockControls>
			<div
				style={{
					textAlign: alignValue as any,
					boxShadow: shadow ? "5px 10px #888888" : "",
				}}
			>
				<h3>Here is your team :)</h3>
				{JSON.stringify(teamData)}
				<h4>Here is your image data:</h4>
				{JSON.stringify(imgInfo)}
				<p>Feel free to add new team members from custom blocks</p>
				<RichText
					placeholder="Set some value..."
					value={richTextContent}
					onChange={(value) => setRichTextContent(value)}
				/>
				<section {...innerBlockProps} />
			</div>
		</>
	);
}

export default FootballMembers;
