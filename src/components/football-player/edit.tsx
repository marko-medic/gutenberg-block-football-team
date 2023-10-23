import { useBlockProps } from "@wordpress/block-editor";
import { BlockEditProps } from "@wordpress/blocks";
import { useTeamContext } from "../../context";
import { Button } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { PlayerData } from "../../types";
import ImageUploader from "../image-uploader";

export default function Edit({ context }: BlockEditProps<{}>) {
	const { teamData, saveTeamMembers } = useTeamContext();
	const [state, setState] = useState<PlayerData>({
		name: "",
		age: 0,
		position: "",
		tshirtSize: "",
	});
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// validation...
		const updatedTeamMembers = [...teamData, state];
		saveTeamMembers(updatedTeamMembers);
	};

	const handleSetPlayerState = (attr: keyof PlayerData, value: string) => {
		setState({
			...state,
			[attr]: value,
		});
	};

	return (
		<div {...useBlockProps()}>
			<form onSubmit={handleSubmit} style={{ maxWidth: "60%" }}>
				<input
					placeholder="Name"
					type="text"
					value={state.name}
					onChange={(e) => handleSetPlayerState("name", e.target.value)}
				/>
				<br />
				<input
					placeholder="Age"
					type="text"
					value={state.age || ""}
					onChange={(e) => handleSetPlayerState("age", e.target.value)}
				/>
				<br />
				<input
					placeholder="Position"
					type="text"
					value={state.position}
					onChange={(e) => handleSetPlayerState("position", e.target.value)}
				/>
				<br />
				<br />
				<input
					placeholder="Tshirt size"
					type="text"
					value={state.tshirtSize}
					onChange={(e) => handleSetPlayerState("tshirtSize", e.target.value)}
				/>
				<br />
				<ImageUploader />
				<br />
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
}
