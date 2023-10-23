import { useContext, createContext } from "@wordpress/element";
import { PlayerData } from "../types";

const TeamDataContext = createContext({
	teamData: [] as PlayerData[],
	teamName: "string",
	saveTeamMembers: (teamData: PlayerData[]) => {},
	setAttributes: (attrs: any) => {},
	attributes: {} as Readonly<any>,
});

interface Props {
	children: React.ReactNode;
	teamData: PlayerData[];
	saveTeamMembers: (teamData: PlayerData[]) => void;
	attributes: Readonly<any>;
	setAttributes: (attrs: any) => void;
}

export const TeamDataProvider = ({
	children,
	teamData,
	saveTeamMembers,
	attributes,
	setAttributes,
}: Props) => {
	return (
		<TeamDataContext.Provider
			value={{
				teamName: "My Custom Team",
				teamData,
				saveTeamMembers,
				attributes,
				setAttributes: setAttributes,
			}}
		>
			{children}
		</TeamDataContext.Provider>
	);
};

export const useTeamContext = () => useContext(TeamDataContext);
