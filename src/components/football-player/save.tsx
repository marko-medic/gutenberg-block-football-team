import { useBlockProps } from "@wordpress/block-editor";

export default function Save(props: any) {
	console.log("@@propss", props);

	return <div {...useBlockProps.save()}>I'm saved player...</div>;
}
