// @ts-nocheck

import { registerFormatType, toggleFormat } from "@wordpress/rich-text";
import { RichTextToolbarButton } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

interface Props {
	isActive: boolean;
	value: string;
	onChange: (val: unknown) => void;
}

const LowerTextFormatButton = ({ isActive, value, onChange }: Props) => {
	return (
		<RichTextToolbarButton
			icon="edit"
			title={__("LowerText", "blocks-course")}
			onClick={() => {
				onChange(
					toggleFormat(value, {
						type: "custom-block/lower-text",
						attributes: {
							style: "font-size: 0.7rem",
						},
					}),
				);
			}}
			isActive={isActive}
		/>
	);
};

registerFormatType("custom-block/lower-text", {
	title: __("LowerText", "custom-block"),
	tagName: "span",
	className: "lower-text",
	edit: LowerTextFormatButton,
});
