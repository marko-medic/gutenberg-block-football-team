import { dispatch } from "@wordpress/data";
import { populateTshirts } from "./controls";
import { populateTshirts as populateTshirtsAction } from "./actions";
import { store as noticesStore } from "@wordpress/notices";

export function* getTshirts() {
	try {
		// @ts-ignore
		const tshirts = yield populateTshirts();
		return populateTshirtsAction(tshirts);
	} catch (error: any) {
		return dispatch(noticesStore).createErrorNotice(
			error.message || "Could not fetch todos.",
		);
	}
}
