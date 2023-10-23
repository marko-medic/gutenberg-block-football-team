import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { TemplateArray } from "@wordpress/blocks";
import { Button } from "@wordpress/components";

interface Props {
	teamCount: number;
	onFinish: () => void;
}

function TeamFormFill({ teamCount, onFinish }: Props) {
	const generateMembersTemplate = (): TemplateArray => {
		return Array.from({ length: teamCount || 2 }).map((_, index) => {
			return ["custom-block/football-player"];
		});
	};

	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ["custom-block/football-player"],
		template: generateMembersTemplate(),
	});

	return (
		<div {...useBlockProps()}>
			<h3>Fill basic info</h3>
			<section {...innerBlockProps} />
			<Button onClick={onFinish} variant="secondary">
				Finish
			</Button>
		</div>
	);
}

export default TeamFormFill;
