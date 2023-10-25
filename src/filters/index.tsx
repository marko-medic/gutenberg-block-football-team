import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";

const addStylingToFootballTeam = (props: any, block: any, attributes: any) => {
	if (block.name !== "custom-block/football-team") {
		return props;
	}

	return {
		...props,
		style: { color: "red", fontSize: "1.2rem" },
	};
};

// add style to useBlockProps.save()
addFilter(
	"blocks.getSaveContent.extraProps",
	"custom-block/addExtraProps",
	addStylingToFootballTeam,
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

// modify block content
addFilter(
	"editor.BlockEdit",
	"custom-block/with-inspector-controls",
	withInspectorControls,
);

function modifyPositionVisibility(settings: any, name: string) {
	const attributes = {
		positionFieldVisible: {
			type: "boolean",
			default: true,
		},
	};

	if (name !== "custom-block/football-player") {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			...attributes,
		},
	};
}

// modify block params
addFilter(
	"blocks.registerBlockType",
	"custom-block/football-team",
	modifyPositionVisibility,
);
