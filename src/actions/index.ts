import { addAction } from "@wordpress/hooks";

addAction(
	"editor.ErrorBoundary.errorLogged",
	"custom-block/error-capture",
	(error) => {
		console.log("@@caught in erorr capture", error);
	},
);
