import { TShirtData } from "../types";
import { TSHIRT_TYPES } from "./types";

const DEFAULT_STATE = {
	items: [],
};

const reducer = (
	state = DEFAULT_STATE,
	action: { type: string; payload: any },
) => {
	switch (action.type) {
		case TSHIRT_TYPES.POPULATE_TSHIRTS:
			return { ...state, items: action.payload };

		case TSHIRT_TYPES.UPDATE_TSHIRTS:
			return { ...state, items: action.payload };

		case TSHIRT_TYPES.ADD_TSHIRT: {
			const tshirtList = [...state.items];
			// @ts-ignore
			tshirtList.push(action.payload);
			return { ...state, items: tshirtList };
		}
		case TSHIRT_TYPES.REMOVE_TSHIRT: {
			const tshirtList = [...state.items];
			const filteredTshirtList = tshirtList.filter(
				(shirt: TShirtData) => shirt.id !== action.payload,
			);

			return { ...state, items: filteredTshirtList };
		}

		default:
			return state;
	}
};

export default reducer;
