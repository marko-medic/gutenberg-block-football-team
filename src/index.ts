import { createBlock, registerBlockType } from "@wordpress/blocks";
import "./components/football-player";
import "./slot-fill";
import "./store";
import "./filters";
import "./actions";
import "./fortmat-types";
import "./style.scss";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
// @ts-ignore
registerBlockType(metadata, {
	edit: Edit,
	save,
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/paragraph"],
				transform: () => {
					return createBlock("custom-block/football-team", {
						teamCount: 5,
						teamLimit: 5,
					});
				},
			},
			{
				type: "block",
				blocks: ["core/gallery"],
				// @ts-ignore
				transform({ images, columns }) {
					const innerBlocks = images.map(() => {
						return createBlock("custom-block/football-player");
					});
					return createBlock(
						"custom-block/football-team",
						{
							teamCount: columns || 5,
							initialFormSubmitted: true,
							membersFormSubmitted: true,
						},
						innerBlocks,
					);
				},
			},

			{
				type: "enter",
				regExp: /football-team/i,
				transform: () => {
					return createBlock("custom-block/football-team", {
						teamCount: 3,
						teamLimit: 11,
					});
				},
			},
			{
				type: "prefix",
				prefix: "football-team",
				transform: () => {
					return createBlock("custom-block/football-team", { teamCount: 4 });
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: ["core/paragraph"],
				isMatch: ({ teamCount }) => {
					return teamCount <= 11;
				},
				transform: ({ teamCount, teamLimit }) => {
					return createBlock("core/paragraph", {
						content: `This team has ${teamCount}/${teamLimit} players`,
						align: "center",
					});
				},
			},
		],
	},
});
