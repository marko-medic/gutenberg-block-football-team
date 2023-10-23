import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, TextControl } from "@wordpress/components";
import { useState } from "@wordpress/element";

interface Props {
	onFormSubmitted: () => void;
	teamCount: number;
	onSetTeamCount: (value: string) => void;
}

function InitialTeamForm({
	onFormSubmitted,
	teamCount,
	onSetTeamCount,
}: Props) {
	const [minPlayers, setMinPlayers] = useState(0);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!teamCount || teamCount < minPlayers) {
			alert("Increase team count!");
			return;
		}
		onFormSubmitted();
	};

	return (
		<>
			<div {...useBlockProps()}>
				<h3>Fill basic team info</h3>
				<form onSubmit={handleSubmit}>
					<input
						type="number"
						value={teamCount || ""}
						placeholder="Set team count"
						onChange={(e) => onSetTeamCount(e.target.value)}
					/>
					<Button type="submit">Proceed</Button>
				</form>
			</div>
			<InspectorControls>
				<PanelBody>
					<TextControl
						type="number"
						value={minPlayers}
						onChange={(val) => setMinPlayers(Number(val))}
						help="Set min team players"
					></TextControl>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default InitialTeamForm;
