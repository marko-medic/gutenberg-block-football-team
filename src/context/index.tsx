import { useContext, createContext } from "@wordpress/element";

const TeamDataContext = createContext({
	teamName: "string",
	setAttributes: (attrs: any) => {},
	attributes: {} as Readonly<any>,
});

interface Props {
	children: React.ReactNode;
	attributes: Readonly<any>;
	setAttributes: (attrs: any) => void;
}

export const TeamDataProvider = ({
	children,
	attributes,
	setAttributes,
}: Props) => {
	return (
		<TeamDataContext.Provider
			value={{
				teamName: "My Custom Team",
				attributes,
				setAttributes: setAttributes,
			}}
		>
			{children}
		</TeamDataContext.Provider>
	);
};

export const useTeamContext = () => useContext(TeamDataContext);
