declare module "*.html" {
	const content: string;
	export default content;
}

declare module "*.module.css" {
	const classes: { [className: string]: string };
	export = classes;
}