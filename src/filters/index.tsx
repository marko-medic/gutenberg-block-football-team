import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";

// add style to useBlockProps.save()
addFilter(
	"blocks.getSaveContent.extraProps",
	"custom-block/addExtraProps",
	function (props, block, attributes) {
		if (block.name !== "custom-block/football-team") {
			return props;
		}

		return {
			...props,
			style: { color: "red", fontSize: "1.1rem" },
		};
	},
);

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (props.name !== "custom-block/football-team") {
			return <BlockEdit {...props} />;
		}
		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody>My custom control</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, "withInspectorControl");

addFilter(
	"editor.BlockEdit",
	"custom-block/with-inspector-controls",
	withInspectorControls,
);
