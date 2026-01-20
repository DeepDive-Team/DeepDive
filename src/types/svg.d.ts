declare module "*.svg" {
	const content: string;
	export default content;
}

declare module "*.svg?url" {
	const content: URL;
	export default content;
}