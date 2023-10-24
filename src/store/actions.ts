import axios from "axios";
import {
	updateTshirts as updateTshirtsControl,
	addTshirt as addTshirtControl,
} from "./controls";
import { TShirtData } from "../types";
import { TSHIRT_TYPES } from "./types";
import { STORE_BASE_URL } from "./const";

export const populateTshirts = (value: any[]) => ({
	type: TSHIRT_TYPES.POPULATE_TSHIRTS,
	payload: value,
});

export function* updateTshirts(payload: TShirtData[]) {
	// @ts-ignore
	const resp = yield updateTshirtsControl(payload);
	return {
		type: TSHIRT_TYPES.UPDATE_TSHIRTS,
		payload: resp,
	};
}

export function* addTshirt(payload: TShirtData) {
	// @ts-ignore
	const resp = yield addTshirtControl(payload);
	return {
		type: TSHIRT_TYPES.ADD_TSHIRT,
		payload: resp,
	};
}

export function removeTshirt(payload: TShirtData["size"]) {
	return async function ({ select, dispatch }: any) {
		const tshirts = select((s: any) => {
			return s.root.items;
		});
		const shirtToRemove = tshirts.find(
			(shirt: TShirtData) => shirt.size === payload,
		);
		if (!shirtToRemove) {
			alert("Tshirt not found");
			return;
		}
		try {
			await axios.delete(`${STORE_BASE_URL}/${shirtToRemove.id}`);
		} catch (error) {
			console.log("@@error", error);
			return;
		}

		// just for demo purposes...
		// we could simply pass tshirt size here to redux instead...
		dispatch({
			type: TSHIRT_TYPES.REMOVE_TSHIRT,
			payload: shirtToRemove.id,
		});
	};
}
