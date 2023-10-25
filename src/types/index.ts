export interface ImgInfo {
	id: string;
	url: string;
	alt: string;
}

export interface TShirtData {
	size: string;
	price: string;
	id: number;
	selected: boolean;
}

export interface PlayerData {
	name: string;
	age: number;
	position: string;
	tshirtSize: TShirtData["size"];
	imgInfo: ImgInfo;
	positionFieldVisible?: boolean;
}
