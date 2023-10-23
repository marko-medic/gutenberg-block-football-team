import { withThemeData } from "../HOC/withThemeData";
import { usePermalink } from "../hooks/usePermalink";

function ThemeInfo(props: any) {
	const permalink = usePermalink();
	return (
		<div>
			Theme info: {props.author} --- {props.name?.raw} --- {props.status} --{" "}
			{props.version} --- {permalink}
		</div>
	);
}

export default withThemeData(ThemeInfo);
