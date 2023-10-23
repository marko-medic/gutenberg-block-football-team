import { useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { store as coreStore } from "@wordpress/core-data";

export const useImageOptions = (id: string): any[] => {
	const imageObject = useSelect(
		(select: any) => {
			const { getMedia } = select(coreStore.name);
			return id ? getMedia(id) : null;
		},
		[id],
	);

	const imageSizes = useSelect((select: any) => {
		return select(blockEditorStore).getSettings().imageSizes;
	}, []);

	const getImageSizeOptions = () => {
		if (!imageObject) {
			return [];
		}
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find(
				(s: { slug: string }) => s.slug === key,
			);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url,
				});
			}
		}
		return options;
	};

	return getImageSizeOptions();
};
