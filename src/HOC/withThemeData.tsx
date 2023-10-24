// @ts-nocheck
import { withSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

export const withThemeData = (Component) => {
	return withSelect((select, _ownProps) => {
		const { getCurrentTheme } = select(coreStore.name);
		let themeProps = {};
		if (getCurrentTheme) {
			const { version, status, name } = getCurrentTheme() || {};
			themeProps = {
				version,
				status,
				name,
			};
		}
		return themeProps;
	})(Component);
};
