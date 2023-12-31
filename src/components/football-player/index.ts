import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
import Save from "./save";

import "./style.scss";

// @ts-ignore
registerBlockType("custom-block/football-player" as any, {
	title: __("Football Player", "football_team"),
	description: __("A football player", "football_team"),
	icon: "admin-users",
	parent: ["custom-block/football-team"],
	usesContext: ["custom-block/teamLimit"],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		name: {
			type: "string",
		},
		age: {
			type: "string",
		},
		position: {
			type: "string",
		},
		tshirtSize: {
			type: "string",
		},
		imgInfo: {
			type: "object",
		},
	},
	edit: Edit,
	save: Save,
});
