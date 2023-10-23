import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function save(): any {
	const blockProps = useBlockProps.save();

	const innerProps = useInnerBlocksProps.save({
		...blockProps,
		style: {
			opacity: 0.9,
			border: "3px solid green",
		},
	});

	return (
		<div {...blockProps}>
			<section {...innerProps} />
		</div>
	);
}
