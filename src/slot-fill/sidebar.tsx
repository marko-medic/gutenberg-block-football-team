import { Button, PanelBody, TextControl } from "@wordpress/components";
import { dispatch, useDispatch, useSelect } from "@wordpress/data";
import { PluginSidebar } from "@wordpress/edit-post";
import { useState } from "@wordpress/element";
import { store as editorStore } from "@wordpress/editor";
import { registerPlugin } from "@wordpress/plugins";
import { store as noticesStore } from "@wordpress/notices";

import { store as tshirtStore } from "../store/const";

function SidebarInfo() {
	const { getCurrentPost } = useSelect(
		(select: any) => select(editorStore),
		[],
	);
	const { getTshirtCount } = useSelect(
		(select: any) => select(tshirtStore),
		[],
	);

	const currentTitle = getCurrentPost()?.title;

	const { savePost, editPost } = useDispatch(editorStore);
	const { addTshirt, removeTshirt } = useDispatch(tshirtStore);
	const [postTitle, setPostTitle] = useState(currentTitle);
	const [tshirtSize, setTshirtSize] = useState("");
	const [tshirtToRemove, setTshirtToRemove] = useState("");

	const handleSavePost = () => {
		editPost({ title: postTitle });
		savePost();
	};

	const handleAddTshirt = () => {
		if (!tshirtSize) {
			dispatch(noticesStore).createErrorNotice("TshirtSize must be set!");
			return;
		}
		const tshirtData = {
			size: tshirtSize,
			id: Math.random(),
			selected: false,
			price: `$${Math.floor(Math.random() * 500)}`,
		};
		setTshirtSize("");
		addTshirt(tshirtData);
		dispatch(noticesStore).createNotice("success", "Tshirt size added");
	};

	const handleRemoveTshirt = () => {
		if (!tshirtToRemove) {
			dispatch(noticesStore).createErrorNotice(
				"TshirtSize to remove must be set!",
			);
			return;
		}
		setTshirtToRemove("");
		removeTshirt(tshirtToRemove);
		dispatch(noticesStore).createNotice("success", "Tshirt removed");
	};

	return (
		<PluginSidebar
			name="custom-plugin-sidebar"
			icon="admin-settings"
			title="Info changer"
		>
			<PanelBody>
				<div>
					<TextControl
						placeholder="Post title"
						value={postTitle}
						onChange={setPostTitle}
					/>
					<Button style={{ backgroundColor: "#eee" }} onClick={handleSavePost}>
						Save title here
					</Button>
				</div>
				<div style={{ marginTop: "1rem" }}>
					<TextControl
						placeholder="Tshirt size"
						value={tshirtSize}
						onChange={setTshirtSize}
					/>
					<Button style={{ backgroundColor: "pink" }} onClick={handleAddTshirt}>
						Add new tshirt here
					</Button>
				</div>

				<div style={{ marginTop: "1rem" }}>
					<TextControl
						placeholder="Tshirt size to remove"
						value={tshirtToRemove}
						onChange={setTshirtToRemove}
					/>
					<Button
						style={{ backgroundColor: "orange", color: "white" }}
						onClick={handleRemoveTshirt}
					>
						Remove tshirt here
					</Button>
				</div>
				<div>
					<strong>Total number of tshirts is {getTshirtCount()}</strong>
				</div>
			</PanelBody>
		</PluginSidebar>
	);
}

registerPlugin("custom-block-plugin", {
	render: () => <SidebarInfo />,
});
