import { registerPlugin } from "@wordpress/plugins";
import { PluginPostStatusInfo } from "@wordpress/edit-post";
import { store as noticesStore } from "@wordpress/notices";
import { Button } from "@wordpress/components";
import { dispatch, useSelect } from "@wordpress/data";
import { TShirtData } from "../types";
import { store as tshirtStore } from "../store/const";

const PluginPostStatusInfoTest = () => {
	const tshirtSizes = useSelect((select: any) => {
		return select(tshirtStore).getTshirts();
	}, []);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const submittedValues: FormDataEntryValue[] = [];
		for (const [_key, value] of formData) {
			// @ts-ignore
			submittedValues.push(value);
		}
		if (submittedValues.length === 0) {
			alert("Please select tshirt sizes");
			return;
		}
		const updatedTshirtSizes = tshirtSizes.map((tshirt: TShirtData) => ({
			...tshirt,
			selected: submittedValues.includes(tshirt.size),
		}));

		const { updateTshirts } = dispatch(tshirtStore) as any;
		updateTshirts(updatedTshirtSizes);
		dispatch(noticesStore).createNotice("success", "Values are saved!");
	};

	const renderOptions = () =>
		tshirtSizes.map((tshirt: TShirtData) => (
			<div key={tshirt.id}>
				<span>{tshirt.size}</span>
				<input
					name={tshirt.size}
					type="checkbox"
					value={tshirt.size}
					defaultChecked={tshirt.selected}
				/>
			</div>
		));

	return (
		<PluginPostStatusInfo>
			<h4>Select available TShirt sizes</h4>
			<form onSubmit={submitHandler}>
				{renderOptions()}
				<Button
					style={{
						backgroundColor: "orange",
						color: "white",
						marginTop: "0.5rem",
					}}
					type="submit"
				>
					DONE
				</Button>
			</form>
		</PluginPostStatusInfo>
	);
};

registerPlugin("custom-block-info-test", { render: PluginPostStatusInfoTest });
