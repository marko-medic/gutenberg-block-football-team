import {
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	// @ts-ignore
	MediaReplaceFlow,
} from "@wordpress/block-editor";
import { useImageOptions } from "../hooks/useImageOptions";
import {
	PanelBody,
	SelectControl,
	Spinner,
	TextareaControl,
	ToolbarButton,
	withNotices,
} from "@wordpress/components";
import { isBlobURL } from "@wordpress/blob";
import { ImgInfo } from "../types";

function ImageUploader({
	noticeOperations,
	noticeUI,
	imgInfo,
	onDataChange,
}: any) {
	const imageSizesOptions = useImageOptions(imgInfo?.id);
	const isValidUrl = () => imgInfo?.url && !isBlobURL(imgInfo.url);

	const onChangeAlt = (newAlt: string) => {
		onDataChange({
			...imgInfo,
			alt: newAlt,
		});
	};
	const onSelectImage = (image: ImgInfo) => {
		if (!image || !image.url) {
			onDataChange({ url: undefined, id: undefined, alt: "" });
			return;
		}
		const imgInfo = { url: image.url, id: image.id, alt: image.alt };
		onDataChange(imgInfo);
	};
	const onSelectURL = (newURL: string) => {
		onDataChange({
			url: newURL,
			id: undefined,
			alt: "",
		});
	};
	const onChangeImageSize = (newURL: string) => {
		onDataChange({ ...imgInfo, url: newURL });
	};
	const onUploadError = (message: string) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	const removeImage = () => {
		onDataChange({
			url: undefined,
			alt: "",
			id: undefined,
		});
	};

	const renderImageState = () => {
		if (imgInfo?.url) {
			return (
				<div
					className={`wp-block-custom-block-football-team__img ${
						isBlobURL(imgInfo.url) ? "is-loading" : ""
					}`}
				>
					<img src={imgInfo.url} alt={imgInfo?.alt} />
					{isBlobURL(imgInfo.url) && <Spinner />}
				</div>
			);
		}

		return (
			<MediaPlaceholder
				icon="admin-users"
				onSelect={onSelectImage as any}
				onSelectURL={onSelectURL}
				onError={onUploadError}
				accept="image/*"
				allowedTypes={["image"]}
				notices={noticeUI}
				onHTMLDrop={undefined}
			/>
		);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Image settings">
					<SelectControl
						label="Image size"
						options={imageSizesOptions}
						value={imgInfo.url}
						onChange={onChangeImageSize}
					/>
					{isValidUrl() && (
						<TextareaControl
							label="Alt text"
							value={imgInfo.alt}
							onChange={onChangeAlt}
							help="Alternative text describes your image to people can't see it. Add a short description with its key details."
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div className="wp-block-custom-block-football-team__container">
				{/* @ts-ignore */}
				<BlockControls group="inline">
					{imgInfo?.url && (
						<MediaReplaceFlow
							name="Replace image"
							onSelect={onSelectImage}
							onSelectURL={onSelectURL}
							onError={onUploadError}
							accept="image/*"
							allowedTypes={["image"]}
							mediaId={imgInfo.id}
							mediaURL={imgInfo.url}
						/>
					)}
					{imgInfo?.url && (
						<ToolbarButton onClick={removeImage}>Remove image</ToolbarButton>
					)}
				</BlockControls>
				{renderImageState()}
			</div>
		</>
	);
}

export default withNotices(ImageUploader);
