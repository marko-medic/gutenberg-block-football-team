import {
	AlignmentToolbar,
	BlockControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { BLOCK_ALIAS } from "../const";

function FootballMembers() {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["custom-block/football-player"],
	});
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
				<section {...innerBlockProps} />
				...
				<p>Feel free to add new team members from custom blocks</p>
				<RichText
					placeholder="Set some value..."
					value={richTextContent}
					onChange={(value) => setRichTextContent(value)}
				/>
			</div>
		</>
	);
}

export default FootballMembers;
