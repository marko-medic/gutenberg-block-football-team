import { __ } from "@wordpress/i18n";

import { useBlockProps } from "@wordpress/block-editor";

import { BlockEditProps } from "@wordpress/blocks";
import { ImgInfo, PlayerData } from "./types";
import InitialTeamForm from "./components/initial-team-form";
import TeamFormFill from "./components/team-form-fill";
import { TeamDataProvider } from "./context";
import "./editor.scss";
import FootballMembers from "./components/football-members";
import ThemeInfo from "./components/theme-info";

interface Props {
	teamData: PlayerData[];
	teamCount: number;
	initialFormSubmitted: boolean;
	membersFormSubmitted: boolean;
	teamLimit: number;
	imgInfo: ImgInfo;
}

export default function Edit({
	attributes,
	setAttributes,
}: BlockEditProps<Props>) {
	const blockProps = useBlockProps();

	const {
		initialFormSubmitted,
		membersFormSubmitted,
		teamData,
		teamCount,
		teamLimit,
	} = attributes;

	const onSetTeamCount = (count: string) => {
		setAttributes({ teamCount: Number(count) });
	};

	const onInitialFormSubmitted = () => {
		if (Number(teamCount) > teamLimit) {
			alert("Limit exceded");
			return;
		}
		setAttributes({ initialFormSubmitted: true });
	};

	const onMembersFormSubmitted = (teamData: PlayerData[]) => {
		setAttributes({ teamData: teamData, membersFormSubmitted: true });
	};

	const renderCurrentState = () => {
		if (!initialFormSubmitted) {
			return (
				<InitialTeamForm
					onSetTeamCount={onSetTeamCount}
					teamCount={teamCount}
					onFormSubmitted={onInitialFormSubmitted}
				/>
			);
		}
		if (!membersFormSubmitted) {
			return (
				<TeamFormFill
					teamCount={teamCount}
					onFormSubmitted={onMembersFormSubmitted}
				/>
			);
		}
		return (
			<div {...blockProps}>
				<FootballMembers teamData={teamData} />
				<ThemeInfo author="Marko" />
			</div>
		);
	};

	return (
		<TeamDataProvider
			saveTeamMembers={onMembersFormSubmitted}
			teamData={teamData}
			attributes={attributes as any}
			setAttributes={setAttributes}
		>
			{renderCurrentState()}
		</TeamDataProvider>
	);
}
