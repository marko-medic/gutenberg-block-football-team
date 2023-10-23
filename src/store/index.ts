// @ts-check
import { createReduxStore, register } from "@wordpress/data";
import reducer from "./reducer";
import * as selectors from "./selectors";
import * as actions from "./actions";
import * as resolvers from "./resolvers";
import controls from "./controls";
import { store } from "./const";

const reduxStore = createReduxStore(store, {
	reducer,
	selectors,
	actions,
	resolvers,
	controls,
});

register(reduxStore);
