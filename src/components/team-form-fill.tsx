import { InnerBlocks, RichText, useBlockProps } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { useMemo, useState } from "@wordpress/element";
import { PlayerData, TShirtData } from "../types";
import { useSelect } from "@wordpress/data";
import { store as tshirtStore } from "../store/const";
import ImageUploader from "./image-uploader";
import { createBlock } from "@wordpress/blocks";

interface Props {
	teamCount: number;
	onFormSubmitted: (teamData: PlayerData[]) => void;
}

function TeamFormFill({ teamCount, onFormSubmitted }: Props) {
	const tshirtSizes = useSelect((select: any) => {
		return (select(tshirtStore).getTshirts() || []).filter(
			(tshirt: TShirtData) => tshirt.selected,
		);
	}, []);
	const initialTeamData = useMemo(
		() =>
			Array.from({ length: teamCount }).map(() => ({
				name: "",
				age: 0,
				position: "",
				tshirtSize: tshirtSizes?.[0] || "",
			})),
		[],
	);
	const [teamData, setTeamData] = useState<PlayerData[]>(initialTeamData);

	const setMemberAttribute = (
		index: number,
		attr: keyof PlayerData,
		value: string,
	) => {
		const newTeamData = [...teamData];
		// @ts-ignore
		newTeamData[index][attr] = value;
		setTeamData(newTeamData);
	};

	const renderMembersForm = () => {
		return Array.from({ length: teamCount }).map((_, index) => {
			const InnerBlock = createBlock("custom-block/football-player", {});
			console.log("@@test", InnerBlock);

			return (
				<div key={index} style={{ backgroundColor: "pink", color: "white" }}>
					<p>Player {index + 1} info:</p>
					<section style={{ border: "3px solid green", padding: "0.5rem" }}>
						<p>Name: </p>{" "}
						<RichText
							value={teamData[index].name}
							onChange={(value) => setMemberAttribute(index, "name", value)}
						/>
						<p>Age: </p>
						<RichText
							value={String(teamData[index].age)}
							onChange={(value) => setMemberAttribute(index, "age", value)}
						/>
						<p>Position: </p>
						<RichText
							value={String(teamData[index].position)}
							onChange={(value) => setMemberAttribute(index, "position", value)}
						/>
					</section>
					{/* <InnerBlocks template={[["custom-block/football-player"]]} /> */}
				</div>
			);
		});
	};

	const renderAvailableSizes = () => {
		return tshirtSizes.map((tshirt: TShirtData) => (
			<option key={tshirt.size} value={tshirt.size}>
				{tshirt.size}
			</option>
		));
	};

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// handle validation...
		const formData = new FormData(e.currentTarget);
		let tshirtValue = "";
		for (const [key, value] of formData) {
			// @ts-ignore
			if (key === "tshirtSize") {
				tshirtValue = value as string;
			}
		}
		const newTeamData = [...teamData];
		newTeamData.forEach((data) => {
			data.tshirtSize = tshirtValue;
		});
		setTeamData(newTeamData);
		onFormSubmitted(newTeamData);
	};

	return (
		<div {...useBlockProps()}>
			<h3>Fill basic info</h3>
			<form onSubmit={submitHandler}>
				{renderMembersForm()}
				<ImageUploader />
				<select name="tshirtSize">
					Select tshirt size: {renderAvailableSizes()}
				</select>
				<Button type="submit">Submit form</Button>
			</form>
		</div>
	);
}

export default TeamFormFill;
