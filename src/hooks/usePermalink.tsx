// @ts-nocheck
import { useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";

export const usePermalink = () => {
	const { getPermalink } = useSelect((select) => select(editorStore));

	return getPermalink();
};
